// Domain model
export type DeviceId = number;

export interface Device {
  id: DeviceId;
  category: "phone" | "laptop";
  brand: string;
  model: string;
}

// Domain repository interface
export interface DeviceRepo {
  getAll(): Promise<Device[]>;
  getById(id: DeviceId): Promise<Device | null>;
  save(device: Device): Promise<void>;
}
