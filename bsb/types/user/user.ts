export interface User {
  _id: string;
  shop: string;
  staff: string;
  email: string;
  phone: string;
  password: string;
  language: string;
  timeZone: string;
  role: number;
}

export interface UserReceivePasswordBodyRequest {
  phone: string;
}

export interface UserReceivePasswordResponse {
  message: string;
}

export interface UserLoginBodyRequest {
  identification: string;
  password: string;
}

export interface UserLoginResponse {
  token: string;
}

export interface UserSettingsResponse {
  _id: string;
  language: string;
  timeZone: string;
}

export interface UserSettingsUpdateBodyRequest
  extends Omit<UserSettingsResponse, "_id"> {}
