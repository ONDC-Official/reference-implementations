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

    public static IResult OnSubscribeHandler(OnSubscribeResponse response)
    {
        try
        {
            // Print the incoming challenge
            Console.WriteLine("Received challenge: " + response.Challenge);

            // Retrieve environment variables
            var encryptionPrivateKey = Environment.GetEnvironmentVariable("ENCRYPTION_PRIVATE_KEY");
            var ondcPublicKey = Environment.GetEnvironmentVariable("ONDC_PUBLIC_KEY");

            // Print the keys being used
            Console.WriteLine("Encryption Private Key: " + encryptionPrivateKey);
            Console.WriteLine("ONDC Public Key: " + ondcPublicKey);

            // Attempt decryption
            var (decryptedText, error) = CryptoOperations.Decrypt(
                encryptionPrivateKey,
                ondcPublicKey,
                response.Challenge
            );

            // Check for decryption errors
            if (error != null)
            {
                Console.WriteLine("Decryption error: " + error.Message);
                return Results.BadRequest(new { error = error.Message });
            }

            // Print the decrypted text
            Console.WriteLine("Decrypted text: " + decryptedText);

            return Results.Ok(new { answer1 = decryptedText });
        }
        catch (Exception ex)
        {
            Console.WriteLine("Exception during on_subscribe response: " + ex.Message);
            return Results.Problem($"Error processing subscription: {ex.Message}");
        }
    }

}

public class OnSubscribeResponse
{
    public string SubscriberId { get; set; }
    public string Challenge { get; set; }
}

