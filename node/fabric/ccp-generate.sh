#!/bin/bash

function one_line_pem {
    echo "$(awk 'NF {sub(/\\n/, ""); printf "%s\\\\n",$0;}' $1)"
}

function json_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.json
}

# 이런건 정하님 테스트 환경 값으로
ORG=1
P0PORT=7050
CAPORT=7054
# org, org-ca 의 펨키 있는 경로
PEERPEM=organizations/peerOrganizations/org${ORG}.example.com/tlsca/tlsca.org${ORG}.example.com-cert.pem
CAPEM=organizations/peerOrganizations/org${ORG}.example.com/ca/ca.org${ORG}.example.com-cert.pem
# 경로 설정 잘 해주삼
echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" >organizations/peerOrganizations/org${ORG}.example.com/connection-org${ORG}.json
