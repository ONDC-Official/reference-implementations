import { createAuthorizationHeader } from "ondc-crypto-sdk-nodejs";
import fetch from 'node-fetch';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Constants for header generation
const caller_subscriberId = process.env.SUBSCRIBER_ID || "<YOUR_SUBSCRIBER_ID>"; // Replace with your actual subscriber ID
const uniqueKeyId = process.env.UNIQUE_KEY_ID || "<YOUR_UNIQUE_KEY_ID>"; // Replace with your actual unique key ID
const privateKey = process.env.PRIVATE_KEY || "<YOUR_PRIVATE_KEY>"; // Replace with your actual private key
const registryUrl = process.env.REGISTRY_URL || "https://staging.registry.ondc.org/v2.0/lookup";

// Registry URL for the ONDC registry
// staging: https://staging.registry.ondc.org/v2.0/lookup
// production: https://prod.registry.ondc.org/v2.0/lookup
// preproduction: https://preprod.registry.ondc.org/v2.0/lookup

async function main(params) {
  const { country, type, ukid, domain, city, subscriberId } = params;

  // Generate the authorization header
  const header = await createAuthorizationHeader({
    body: JSON.stringify({
      country: country,
      type: type,
      subscriber_id: subscriberId, 
      domain: domain,
      city: city,
      ukid: ukid
    }),
    privateKey: privateKey,
    subscriberId: caller_subscriberId,
    subscriberUniqueKeyId: uniqueKeyId,
  });

  // Construct the JSON body
  const body = JSON.stringify({
    country: country,
    type: type,
    subscriber_id: subscriberId, // Use `ukid` for the body
    domain: domain,
    city: city,
    ukid: ukid
  });

  console.log("--------------------------------------------------------");
  const response = await fetch(registryUrl, {
    method: 'POST',
    headers: {
      'Authorization': header,
      'Content-Type': 'application/json'
    },
    body: body
  });

  const jsonResponse = await response.json();
  console.log(jsonResponse);
}

// Parse CLI arguments using yargs
const argv = yargs(hideBin(process.argv))
  .option('country', {
    type: 'string',
    describe: 'Country code (e.g., IND)'
  })
  .option('type', {
    type: 'string',
    describe: 'Type (e.g., BAP)'
  })
  .option('ukid', {
    type: 'string',
    describe: 'Unique Key ID (UKID) for the body'
  })
  .option('subscriberId', {
    type: 'string',
    describe: 'Subscriber ID'
  })
  .option('domain', {
    type: 'string',
    describe: 'Domain name'
  })
  .option('city', {
    type: 'string',
    describe: 'City name'
  })
  .help()
  .argv;

// Validate that at least two parameters are provided
const providedParams = ['country', 'type', 'ukid', 'domain', 'city', 'subscriberId'].filter(param => argv[param]);
if (providedParams.length < 2) {
  console.error("Error: At least two parameters are required to run the script.");
  process.exit(1);
}

// Create a params object from CLI arguments
const params = {
  country: argv.country,
  type: argv.type,
  ukid: argv.ukid,
  domain: argv.domain,
  city: argv.city,
  subscriberId: argv.subscriberId
};

// Call the main function with params
main(params);