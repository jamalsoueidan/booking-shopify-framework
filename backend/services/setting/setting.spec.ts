import { shop } from "@jamalsoueidan/bit-dev.testing-library.mongodb";
import { SettingServiceFindOneAndUpdate, SettingServiceGet } from "./setting";

require("@jamalsoueidan/bit-dev.testing-library.mongodb/mongodb.jest");

describe("SettingService", () => {
  it("Should create or update a setting", async () => {
    const query = {
      shop,
    };

    const body = {
      language: "en",
    };

    const createSetting = await SettingServiceFindOneAndUpdate(query, body);
    expect(createSetting.language).toEqual(body.language);
  });

  it("Should find setting", async () => {
    await SettingServiceFindOneAndUpdate(
      {
        shop,
      },
      {
        language: "en",
      },
    );

    const findSetting = await SettingServiceGet(shop);
    expect(findSetting?.language).toEqual("en");
  });
});
