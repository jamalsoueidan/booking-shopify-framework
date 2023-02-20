export enum StaffRole {
  "owner" = 1,
  "admin" = 3,
  "user" = 99,
}

export const StaffRoleKeys = Object.keys(StaffRole).reduce(
  (acc: number[], curr, index, arr) => {
    if (index < arr.length / 2) acc.push(parseInt(curr, 10));
    return acc;
  },
  [],
);

export interface Staff {
  _id: string;
  shop: string;
  fullname: string;
  email: string;
  phone: string;
  active: boolean;
  avatar: string;
  position: string;
  postal: number;
  address: string;
  group: string;
  password?: string;
  language?: string;
  timeZone?: string;
  role?: StaffRole;
}

export interface StaffBodyUpdate extends Partial<Omit<Staff, "_id" | "shop">> {}
export interface StaffBodyCreate extends Omit<Staff, "_id" | "shop"> {}

export interface StaffReceivePasswordBodyRequest {
  phone: string;
}

export interface StaffReceivePasswordResponse {
  message: string;
}

export interface StaffLoginBodyRequest {
  identification: string;
  password: string;
}

export interface StaffLoginResponse {
  token: string;
}

export interface StaffSettingsResponse {
  language: string;
  timeZone: string;
}

export interface StaffSettingsUpdateBodyRequest
  extends Omit<StaffSettingsResponse, "_id"> {}
