import { DeviceRepo } from "../Domain/device-repo";

export interface ListDevicesDeps {
  deviceRepo: DeviceRepo;
}

export async function listDevices({ deviceRepo }: ListDevicesDeps) {
  return await deviceRepo.getAll();
}
