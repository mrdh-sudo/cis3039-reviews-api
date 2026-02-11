import { CosmosClient, Container } from "@azure/cosmos";
import { Device, DeviceId } from "../Domain/CreateDevice";
import { DeviceRepo } from "../Domain/device-repo";

/**
 * Constructor options (no hard-coded config)
 */
export type CosmosDeviceRepoOptions = {
  endpoint: string;
  databaseId: string;
  containerId: string;
  key?: string; // optional access-key auth (AAD/MSI if omitted)
};

/**
 * Internal DTO (Cosmos container shape)
 * ⚠️ Not the domain model
 */
type DeviceDto = {
  id: string;        // Cosmos requires string id
  deviceId: number;  // domain identifier
  category: "phone" | "laptop";
  brand: string;
  model: string;
};

/**
 * Mapping: DTO → Domain
 */
const toDomain = (dto: DeviceDto): Device => ({
  id: dto.deviceId,
  category: dto.category,
  brand: dto.brand,
  model: dto.model,
});

/**
 * Mapping: Domain → DTO
 */
const toDto = (device: Device): DeviceDto => ({
  id: device.id.toString(),
  deviceId: device.id,
  category: device.category,
  brand: device.brand,
  model: device.model,
});

/**
 * Cosmos DB implementation of DeviceRepo
 * (Infrastructure layer)
 */
export class CosmosDeviceRepo implements DeviceRepo {
  private readonly container: Container;

  constructor(options: CosmosDeviceRepoOptions) {
    const client = new CosmosClient({
      endpoint: options.endpoint,
      key: options.key, // undefined → Managed Identity / AAD
    });

    this.container = client
      .database(options.databaseId)
      .container(options.containerId);
  }

  async getAll(): Promise<Device[]> {
    const { resources } = await this.container.items
      .query<DeviceDto>("SELECT * FROM c")
      .fetchAll();

    return resources.map(toDomain);
  }

  async getById(id: DeviceId): Promise<Device | null> {
    try {
      const { resource } = await this.container
        .item(id.toString(), id.toString())
        .read<DeviceDto>();

      return resource ? toDomain(resource) : null;
    } catch {
      return null;
    }
  }

  async save(device: Device): Promise<void> {
    await this.container.items.upsert(toDto(device));
  }
}
