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

    public static IResult OndcSiteVerificationHandler()
    {
        try
        {
            var (signedContent, error) = CryptoOperations.CreateSignedData(
                Environment.GetEnvironmentVariable("REQUEST_ID"),
                Environment.GetEnvironmentVariable("SIGNING_PRIVATE_KEY")
            );

            if (error != null)
            {
                return Results.Problem($"Error creating signed data: {error.Message}");
            }

            var modifiedHTML = Utils.HtmlFile.Replace("SIGNED_UNIQUE_REQ_ID", signedContent);

            return Results.Content(modifiedHTML, "text/html; charset=utf-8");
        }
        catch (Exception ex)
        {
            return Results.Problem($"Error in site verification: {ex.Message}");
        }
    }



}
