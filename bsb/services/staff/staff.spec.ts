import { shop } from "@jamalsoueidan/bsd.testing-library.mongodb";
import { StaffServiceCreate, StaffServiceFindAll, StaffServiceFindByIdAndUpdate, StaffServiceFindOne } from "./staff";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

const staff = {
  active: true,
  address: "asdpkads 12",
  avatar: "https://test.dk/test.png",
  email: "test@test.com",
  fullname: "jamasdeidan",
  group: "a",
  phone: "+4531317428",
  position: "1",
  postal: 8000,
  shop,
};

describe("StaffService test", () => {
  it("Should create a staff", async () => {
    const createSetting = await StaffServiceCreate(staff);
    expect(createSetting).not.toBeNull();
  });

  it("Should get list of staff", async () => {
    await StaffServiceCreate(staff);
    const allStaff = await StaffServiceFindAll(shop);
    expect(allStaff.length).toEqual(1);
  });

  it("Should update staff", async () => {
    await StaffServiceCreate(staff);
    const allStaff = await StaffServiceFindAll(shop);
    const oneStaff = allStaff.pop();

    const body = {
      fullname: "jamal soueidan",
    };

    const updateStaff = await StaffServiceFindByIdAndUpdate(oneStaff?._id, body);
    expect(updateStaff?.fullname).toEqual(body.fullname);
  });

  it("Should get one staff by id", async () => {
    const allStaff = await StaffServiceFindAll(shop);
    const staff = allStaff.pop();

    const oneStaff = await StaffServiceFindOne({
      _id: staff?._id,
      shop,
    });
    expect(oneStaff?._id).toEqual(staff?._id);
  });
});
