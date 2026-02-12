import { CosmosClient } from "@azure/cosmos";
import { CosmosDeviceRepo } from "../adapters/CosmosDeviceRepo";

// Lazy singleton instance
let deviceRepo: CosmosDeviceRepo | null = null;

export function getDeviceRepo(): CosmosDeviceRepo {
  if (!deviceRepo) {
    const endpoint =
      "https://devicecatalogue-dev-ka47-cosmos-norwayeast.documents.azure.com:443/";

    const key = process.env.COSMOS_KEY;

    if (!key) {
      throw new Error("COSMOS_KEY environment variable is not set.");
    }

    const client = new CosmosClient({
      endpoint,
      key,
    });

    deviceRepo = new CosmosDeviceRepo(
      client,
      "devicecatalogue-db", // database name
      "devices"             // container name
    );
  }

  return deviceRepo;
}
