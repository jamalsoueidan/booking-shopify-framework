import { SettingBodyUpdate, ShopQuery } from "@jamalsoueidan/bsb.types";
import { SettingModel } from "./setting.model";

export const SettingServiceGet = (shop: string) => SettingModel.findOne({ shop });

export const SettingServiceFindOneAndUpdate = (query: ShopQuery, body: SettingBodyUpdate) =>
  SettingModel.findOneAndUpdate(query, body, {
    new: true,
    upsert: true,
  });
