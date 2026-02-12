import { CosmosDeviceRepo } from "../infra/cosmos-device-repo";
import seedData from "./device.json";
import { Device } from "../Domain/CreateDevice";

async function getDeviceRepo() {
  return new CosmosDeviceRepo({
    endpoint: process.env.COSMOS_ENDPOINT!,
    databaseId: process.env.COSMOS_DATABASE_ID!,
    containerId: process.env.COSMOS_CONTAINER_ID!,
    key: process.env.COSMOS_KEY
  });
}

async function main() {
  const repo = await getDeviceRepo();

  console.log(" Seeding device data...");

  for (const device of seedData as any) {
    await repo.save(device as Device);
    console.log(`Inserted device: ${device.id} (${device.brand} ${device.model})`);
  }

  console.log("✅ Seeding complete.");
}

main().catch(err => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
