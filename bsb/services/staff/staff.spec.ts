require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.spec");
import { StaffServiceCreate, StaffServiceFindAll, StaffServiceFindByIdAndUpdate, StaffServiceFindOne } from "./staff";

const shop = "testerne";

const staff = {
  fullname: "jamasdeidan",
  email: "test@test.com",
  phone: "+4531317428",
  avatar: "https://test.dk/test.png",
  position: "1",
  postal: 8000,
  address: "asdpkads 12",
  active: true,
  group: "a",
  shop,
};

describe("Admin-staff controller", () => {
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
      shop,
      _id: staff?._id,
    });
    expect(oneStaff?._id).toEqual(staff?._id);
  });
});
