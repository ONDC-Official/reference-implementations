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

            return Results.Ok(new { answer = decryptedText });
        }
        catch (Exception ex)
        {
            return Results.Problem($"Error processing subscription: {ex.Message}");
        }
    }
    public static IResult GenerateHeaderHandler(GenerateAuthHeaderRequest request)
    {

        var (authHeader, error) = CryptoOperations.GenerateAuthorizationHeader(
                request.Payload,
                request.SubscriberId,
                request.UniqueKeyId,
                request.PrivateKey
        );
        if (error != null)
        {
            return Results.Problem($"Error generating authorization header: {error.Message}");
        }
        return Results.Ok(new { authHeader = authHeader, message = "Remove escape characters before using this header" });
    }

    public static IResult VlookupSignatureHandler(SignatureRequest request)
    {
        try
        {
            // Use the SignRequestForVlookup method from CryptoOperations
            string signature = CryptoOperations.SignRequestForVlookup(
                request.PrivateKey,
                request.SearchParameters.Country,
                request.SearchParameters.Domain,
                request.SearchParameters.City,
                request.SearchParameters.Type,
                request.SearchParameters.SubscriberId
            );

            if (string.IsNullOrEmpty(signature))
            {
                return Results.Problem("Error signing search parameters.");
            }

            return Results.Ok(new { signature });
        }
        catch (Exception ex)
        {
            return Results.Problem($"Error processing signature request: {ex.Message}");
        }
    }

    public static IResult VerifyHeaderHandler(VerifyHeaderRequest request)
    {
        try
        {
            if (request == null || string.IsNullOrEmpty(request.Header) || request.Value == null || string.IsNullOrEmpty(request.PublicKey))
            {
                return Results.BadRequest(new { error = "Missing required fields: header, value, public_key" });
            }

            var (isValid, error) = CryptoOperations.VerifyAuthorizationHeader(request.Header, request.Value, request.PublicKey);
            if (error != null)
            {
                return Results.BadRequest(new { is_valid = false, error = error.Message });
            }
            return Results.Ok(new { is_valid = isValid });
        }
        catch (Exception ex)
        {
            return Results.Problem($"Error verifying header: {ex.Message}");
        }
    }

}

public class OnSubscribeResponse
{
    public string SubscriberId { get; set; }
    public string Challenge { get; set; }
}

public class GenerateAuthHeaderRequest
{
    public object Payload { get; set; }
    public string SubscriberId { get; set; }
    public string UniqueKeyId { get; set; }
    public string PrivateKey { get; set; }
}

public class SignatureRequest
{
    public string PrivateKey { get; set; }
    public SearchParameters SearchParameters { get; set; }
}

public class SearchParameters
{
    public string Country { get; set; }
    public string Domain { get; set; }
    public string Type { get; set; }
    public string City { get; set; }
    public string SubscriberId { get; set; }
}


public class VerifyHeaderRequest
{
    public string Header { get; set; }
    public object Value { get; set; }
    public string PublicKey { get; set; }
}



