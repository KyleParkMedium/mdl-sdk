const { Gateway, Wallets } = require("fabric-network");
const FabricCAServices = require("fabric-ca-client");
const fs = require("fs");
const path = require("path");

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

    // 없으면 등록하고 있으면 넘어가고 뭐 이런거 해주는건 나중에 정하님이 작업해주삼.
    // event.js 에서 먼저 등록을 해서 그냥 지우셔도 됩니다 여기는.
    // Enroll the admin user, and import the new identity into the wallet.

    // 이런데 들어가는 값은 다 정하님 config 값
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

    // 채널, 체인코드 네임
    const network = await gateway.getNetwork("mychannel-all");
    const contract = network.getContract("Dev");

    // invoke or query
    try {
      let result = await contract.submitTransaction("EmitEvent");
      console.log(result.toString());
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}

main();
