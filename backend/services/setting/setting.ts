import { ShopQuery } from "@jamalsoueidan/backend.types.api";
import { SettingBodyUpdate } from "@jamalsoueidan/backend.types.setting";
import { SettingModel } from "./setting.model";

export const SettingServiceGet = (shop: string) =>
  SettingModel.findOne({ shop });

export const SettingServiceFindOneAndUpdate = (
  query: ShopQuery,
  body: SettingBodyUpdate,
) =>
  SettingModel.findOneAndUpdate(query, body, {
    new: true,
    upsert: true,
  });
