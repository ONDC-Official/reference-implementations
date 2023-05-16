package com.example.AES_GCM;

import javax.crypto.*;
import java.util.*;
import java.security.SecureRandom;
import java.nio.charset.StandardCharsets;
public  class MainClass{

public static void main(String[] args) {

    try {
    
        //Key Generation DH Shared key Algo

        KeyPairString clientKeys=  KeyGen.genKeyPairs();

        KeyPairString serverKeys=  KeyGen.genKeyPairs();
        SecretKey encsharedKey = KeyGen.getsharedKey(serverKeys.getPublicKey(), clientKeys.getPrivateKey());

        SecureRandom secureRandom = new SecureRandom();
        byte[] bytes = GCMWITHMAC.generateIV(secureRandom);
        byte[] data = "ONDC".getBytes();

        //encryption  Input :- shared key, random Nonce,Plaintext  Output:- CipherText, Authtag
        AuthenticatedCipherText textandmac =  GCMWITHMAC.encrypt(encsharedKey, bytes, data); 

        // expots Encrypted text and mac tag separtely
       System.out.println("Authtag:- "+Base64.getEncoder().encodeToString(textandmac.getAuthenticationTag()));
       System.out.println("cypher:- "+Base64.getEncoder().encodeToString(textandmac.getCipherText()));

       SecretKey decsharedKey = KeyGen.getsharedKey(clientKeys.getPublicKey(), serverKeys.getPrivateKey());
       //decrypption  Input :- shared key, random Nonce, Authtag   Output:- Plaintext
       byte[] plain =GCMWITHMAC.decrypt(decsharedKey,bytes,textandmac.getCipherText(),textandmac.getAuthenticationTag());
       System.out.println("decrypted text:- " +new String(plain, StandardCharsets.UTF_8));;
    } catch (Exception e) {
        // TODO: handle exception
    }
}

}