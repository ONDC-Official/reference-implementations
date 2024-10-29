using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using CryptoUtils;
using DotNetEnv;
using System.Text.Json;
using System.Text;
using System.Net.Http;
using System.Threading.Tasks;

var builder = WebApplication.CreateBuilder(args);

// Load environment variables
Env.Load();

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();

app.MapControllers();

// Define API version 1 routes directly
app.MapGet("/api/v1/generate-keys", Handlers.GenerateKeysHandler);
app.MapPost("/api/v1/on_subscribe", Handlers.OnSubscribeResponse);

// Route for site verification
app.MapGet("/ondc-site-verification.html", Handlers.OndcSiteVerificationHandler);
app.MapPost("/api/v1/generate-auth-header", Handlers.GenerateHeaderHandler);
app.MapPost("/api/v1/vlookup/signature", Handlers.VlookupSignatureHandler);
app.MapPost("/api/v1/vlookup", Handlers.VlookupHandler);

// Health check endpoint
app.MapGet("/health", () => Results.Ok("Utility is running"))
    .WithName("HealthCheck");

app.Run();

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

    public static IResult OnSubscribeResponse(OnSubscribeResponse response)
    {
        try
        {
            Console.WriteLine("Received challenge: " + response.Challenge);

            var encryptionPrivateKey = Environment.GetEnvironmentVariable("ENCRYPTION_PRIVATE_KEY");
            var ondcPublicKey = Environment.GetEnvironmentVariable("ONDC_PUBLIC_KEY");

            Console.WriteLine("Encryption Private Key: " + encryptionPrivateKey);
            Console.WriteLine("ONDC Public Key: " + ondcPublicKey);

            var (decryptedText, error) = CryptoOperations.Decrypt(
                encryptionPrivateKey,
                ondcPublicKey,
                response.Challenge
            );

            if (error != null)
            {
                Console.WriteLine("Decryption error: " + error.Message);
                return Results.BadRequest(new { error = error.Message });
            }

            Console.WriteLine("Decrypted text: " + decryptedText);
            return Results.Ok(new { answer1 = decryptedText });
        }
        catch (Exception ex)
        {
            Console.WriteLine("Exception during on_subscribe response: " + ex.Message);
            return Results.Problem($"Error processing subscription: {ex.Message}");
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

        Console.WriteLine("Authorization header generated successfully." + authHeader);
        return Results.Ok(authHeader);
    }

    public static IResult VlookupSignatureHandler(SignatureRequest request)
    {
        try
        {
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

    private static readonly HttpClient httpClient = new HttpClient();

    public static async Task<IResult> VlookupHandler(VlookupRequest request)
    {
        try
        {
            var jsonPayload = JsonSerializer.Serialize(request);
            Console.WriteLine("Request payload: " + jsonPayload.GetType());
            var snakeCaseJsonPayload = JsonUtils.ConvertPascalCaseJsonToSnakeCase(jsonPayload);
            Console.WriteLine("Snake case JSON payload: " + snakeCaseJsonPayload.GetType());
            var content = new StringContent(snakeCaseJsonPayload, Encoding.UTF8, "application/json");

            var response = await httpClient.PostAsync("https://preprod.registry.ondc.org/vlookup", content);
            var responseContent = await response.Content.ReadAsStringAsync();
            var jsonResponse = JsonSerializer.Deserialize<Dictionary<string, object>>(responseContent);

            Console.WriteLine("Response from vlookup POST request:");
            Console.WriteLine(jsonResponse);

            return Results.Ok(jsonResponse);
        }
        catch (Exception ex)
        {
            return Results.Problem($"Error processing vlookup request: {ex.Message}");
        }
    }

    private static byte[] ConvertObjectToBytes(object obj)
    {
        var json = JsonSerializer.Serialize(obj);
        return Encoding.UTF8.GetBytes(json);
    }
}

public class GenerateAuthHeaderRequest
{
    public object Payload { get; set; }
    public string SubscriberId { get; set; }
    public string UniqueKeyId { get; set; }
    public string PrivateKey { get; set; }
}

public class OnSubscribeResponse
{
    public string SubscriberId { get; set; }
    public string Challenge { get; set; }
}

public class VlookupRequest
{
    public string SenderSubscriberId { get; set; }
    public string RequestId { get; set; }
    public string Timestamp { get; set; }
    public string Signature { get; set; }
    public SearchParameters SearchParameters { get; set; }
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
