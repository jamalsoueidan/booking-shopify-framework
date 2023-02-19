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
}

export interface StaffBodyUpdate extends Partial<Omit<Staff, "_id" | "shop">> {}
export interface StaffBodyCreate extends Omit<Staff, "_id" | "shop"> {}
