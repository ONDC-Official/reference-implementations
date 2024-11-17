using Microsoft.AspNetCore.Http;
using System;

public static class Handlers
{
    public static IResult GenerateKeysHandler()
    {
        try
        {
            var (signingPublicKey, signingPrivateKey) = CryptoOperations.GenerateSigningKeys();
            var (encPublicKey, encPrivateKey) = CryptoOperations.GenerateEncryptionKeys();

            return Results.Ok(new
            {
                signing_public_key = signingPublicKey,
                signing_private_key = signingPrivateKey,
                encryption_public_key = encPublicKey,
                encryption_private_key = encPrivateKey
            });
        }
        catch (Exception ex)
        {
            return Results.Problem($"Error generating keys: {ex.Message}");
        }
    }
}
