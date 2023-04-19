package main

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"fmt"
)

func EC() {
	// ECDSA 타원 곡선 선택 (secp256k1)
	curve := elliptic.P256()

	// 개인키 생성
	privateKey, err := ecdsa.GenerateKey(curve, rand.Reader)
	if err != nil {
		fmt.Println("Failed to generate private key")
		return
	}

	// 공개키 추출
	publicKey := privateKey.PublicKey

	// 개인키와 공개키 출력
	fmt.Printf("Private Key: %x\n", privateKey.D)
	fmt.Printf("Public Key: %x%x\n", publicKey.X, publicKey.Y)
}

func main() {
	EC()
}
