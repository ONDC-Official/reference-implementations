package com.example.AES_GCM;

public class KeyPairString {
    private  String privateKey;
    public String getPrivateKey() {
        return privateKey;
    }
    public KeyPairString(String privateKey, String publicKey) {
        this.privateKey = privateKey;
        this.publicKey = publicKey;
    }
    public void setPrivateKey(String privateKey) {
        this.privateKey = privateKey;
    }
    public String getPublicKey() {
        return publicKey;
    }
    public void setPublicKey(String publicKey) {
        this.publicKey = publicKey;
    }
    private  String publicKey;
}
