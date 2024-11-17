using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text;
using System.Net.Http;
using System.Threading.Tasks;

var builder = WebApplication.CreateBuilder(args);
DotNetEnv.Env.Load();
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
app.MapGet("/ondc-site-verification.html", Handlers.OndcSiteVerificationHandler);
app.MapPost("/api/v1/on_subscribe", Handlers.OnSubscribeHandler);

// Health check endpoint
app.MapGet("/health", () => Results.Ok("Utility is running"))
    .WithName("HealthCheck");

app.Run();


