package configs

import (
	"os"
	"sync"
)

type OndcConfigs struct {
    RequestId                  string
    SigningPrivateKey          string
    SigningPublicKey           string
    OndcPublicKey           string
    EncryptionPublicKey    string
    EncryptionPrivateKey       string
    SubscriberId               string
    UniqueKeyId          string
}

var GlobalConfigs = struct {
    OndcConfigs OndcConfigs
    sync.Once
}{}


func InitializeConfigs() {
    GlobalConfigs.Do(func() {
        GlobalConfigs.OndcConfigs = OndcConfigs{
            RequestId:               os.Getenv("REQUEST_ID"),
            SigningPrivateKey:       os.Getenv("SIGNIN_PRIVATE_KEY"),
            SigningPublicKey:        os.Getenv("SIGNIN_PUBLIC_KEY"),
            OndcPublicKey:           os.Getenv("ONDC_PUBLIC_KEY"),
            EncryptionPublicKey:     os.Getenv("ENCRYPTION_PUBLIC_KEY"),
            EncryptionPrivateKey:    os.Getenv("ENCRYPTION_PRIVATE_KEY"),
            SubscriberId:            os.Getenv("SUBSCRIBER_ID"),
            UniqueKeyId:             os.Getenv("UNIQUE_KEY_ID"),
        }
    })
}
