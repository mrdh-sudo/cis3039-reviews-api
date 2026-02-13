import { CosmosDeviceRepo } from "./cosmos-device-repo";

export function getDeviceRepo() {
  return new CosmosDeviceRepo({
    endpoint: process.env.COSMOS_ENDPOINT!,
    databaseId: process.env.COSMOS_DATABASE_ID!,
    containerId: process.env.COSMOS_CONTAINER_ID!,
    key: process.env.COSMOS_KEY
  });
}
