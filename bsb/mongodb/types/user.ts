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

export interface ReceivePasswordBodyRequest {
  phone: string;
}

export interface ReceivePasswordResponse {
  message: string;
}

export interface LoginBodyRequest {
  identification: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface SettingsResponse {
  _id: string;
  language: string;
  timeZone: string;
}
