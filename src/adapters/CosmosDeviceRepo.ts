import { CosmosClient, Container } from "@azure/cosmos";

export class CosmosDeviceRepo {
  private container: Container;

  constructor(
    client: CosmosClient,
    databaseName: string,
    containerName: string
  ) {
    const database = client.database(databaseName);
    this.container = database.container(containerName);
  }

  async getAll() {
    const { resources } = await this.container.items
      .query("SELECT * FROM c")
      .fetchAll();

    return resources;
  }

  async add(device: any) {
    const { resource } = await this.container.items.create(device);
    return resource;
  }
}
