// device.domain.ts

export type DeviceId = number;
export type DeviceCategory = "phone" | "laptop";
export type DeviceBrand = string;
export type DeviceModel = string;

export type Device = Readonly<{
  id: DeviceId;
  category: DeviceCategory;
  brand: DeviceBrand;
  model: DeviceModel;
}>;

export type Devices = ReadonlyArray<Device>;

// Domain data (phones & laptops)
export const devices: Devices = [
  {
    id: 1,
    category: "phone",
    brand: "Apple",
    model: "iPhone 14",
  },
  {
    id: 2,
    category: "phone",
    brand: "Samsung",
    model: "Galaxy S23",
  },
  {
    id: 3,
    category: "laptop",
    brand: "Dell",
    model: "XPS 13",
  },
  {
    id: 4,
    category: "laptop",
    brand: "Apple",
    model: "MacBook Pro M2",
  },
  {
    id: 5,
    category: "laptop",
    brand: "HP",
    model: "Spectre x360",
  },
];
