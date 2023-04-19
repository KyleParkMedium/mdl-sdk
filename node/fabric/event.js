const { Gateway, Wallets } = require("fabric-network");
const FabricCAServices = require("fabric-ca-client");
const fs = require("fs");
const path = require("path");

const RED = "\x1b[31m\n";
const GREEN = "\x1b[32m\n";
const BLUE = "\x1b[34m";
const RESET = "\x1b[0m";

// callChaincode.js 와 똑같습네다.
async function main() {
  try {
    // Load connection profile; will be used to locate a gateway
    const ccpPath = path.resolve(__dirname, "connection-org1.json");
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

    // Create a new CA client for interacting with the CA.
    const caInfo = ccp.certificateAuthorities["ca.org1.example.com"]; //lookup CA details from config
    const caTLSCACerts = caInfo.tlsCACerts.pem;
    const caClient = new FabricCAServices(
      caInfo.url,
      { trustedRoots: caTLSCACerts, verify: false },
      caInfo.caName
    );

    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    // Enroll the admin user, and import the new identity into the wallet.
    const enrollment = await caClient.enroll({
      enrollmentID: "org1admin",
      enrollmentSecret: "org1adminpw",
    });

    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: "Org1MSP",
      type: "X.509",
    };
    await wallet.put("org1admin", x509Identity);
    console.log(
      "Successfully enrolled admin user and imported it into the wallet"
    );
    console.log(`Built a CA Client named ${caInfo.caName}`);

    const adminIdentity = await wallet.get("org1admin");
    if (!adminIdentity) {
      console.log(
        "An identity for the admin user does not exist in the wallet"
      );
      console.log("Enroll the admin user before retrying");
      return;
    }

    const gateway = new Gateway();
    try {
      await gateway.connect(ccp, {
        wallet,
        identity: "org1admin",
        discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
      });
    } catch (error) {
      console.log(error);
    }

    const network = await gateway.getNetwork("mychannel-all");
    const contract = network.getContract("Dev");

    // event
    try {
      listener = async (event) => {
        const asset = JSON.parse(event.payload.toString());
        console.log(
          `${GREEN}<-- Contract Event Received: ${
            event.eventName
          } - ${JSON.stringify(asset)}${RESET}`
        );
        // show the information available with the event
        console.log(`*** Event: ${event.eventName}:${asset.ID}`);
        // notice how we have access to the transaction information that produced this chaincode event
        const eventTransaction = event.getTransactionEvent();
        console.log(
          `*** transaction: ${eventTransaction.transactionId} status:${eventTransaction.status}`
        );
        // 함수 리턴값이 너무 길어서 주석 처리 해놨음
        // showTransactionData(eventTransaction.transactionData);
        // notice how we have access to the full block that contains this transaction
        const eventBlock = eventTransaction.getBlockEvent();
        console.log(`*** block: ${eventBlock.blockNumber.toString()}`);
      };
      // now start the client side event service and register the listener
      console.log(
        `${GREEN}--> Start contract event stream to peer in Org1${RESET}`
      );

      await contract.addContractListener(listener);
    } catch (eventError) {
      console.log(
        `${RED}<-- Failed: Setup contract events - ${eventError}${RESET}`
      );
    }
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}

function showTransactionData(transactionData) {
  const creator = transactionData.actions[0].header.creator;
  console.log(
    `    - submitted by: ${creator.mspid}-${creator.id_bytes.toString("hex")}`
  );
  for (const endorsement of transactionData.actions[0].payload.action
    .endorsements) {
    console.log(
      `    - endorsed by: ${
        endorsement.endorser.mspid
      }-${endorsement.endorser.id_bytes.toString("hex")}`
    );
  }
  const chaincode =
    transactionData.actions[0].payload.chaincode_proposal_payload.input
      .chaincode_spec;
  console.log(`    - chaincode:${chaincode.chaincode_id.name}`);
  console.log(`    - function:${chaincode.input.args[0].toString()}`);
  for (let x = 1; x < chaincode.input.args.length; x++) {
    console.log(`    - arg:${chaincode.input.args[x].toString()}`);
  }
}

main();
