import { StaffRole } from "@jamalsoueidan/bsb.types.staff";
import { createStaff, shop } from "@jamalsoueidan/bsd.testing-library.mongodb";
import {
  StaffServiceCreate,
  StaffServiceFindAll,
  StaffServiceFindByIdAndUpdate,
  StaffServiceFindOne,
  StaffServiceGetStaffIdsbyGroup,
} from "./staff";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

const staff = {
  active: true,
  address: "asdpkads 12",
  avatar: "https://test.dk/test.png",
  email: "test@test.com",
  fullname: "jamasdeidan",
  group: "a",
  language: "da",
  password: "12345678",
  phone: "+4531317428",
  position: "1",
  postal: 8000,
  role: StaffRole.admin,
  shop,
  timeZone: "Europe/Copenhagen",
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

    const updateStaff = await StaffServiceFindByIdAndUpdate(
      oneStaff?._id,
      body,
    );
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

  it("Should return all staff in the same group", async () => {
    const staffGroupA = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    await createStaff({ group: "a", role: StaffRole.owner });
    await createStaff({ group: "a", role: StaffRole.admin });
    const staffGroupB = await createStaff({ group: "b" });

    let users = await StaffServiceGetStaffIdsbyGroup({
      group: staffGroupA.group,
      shop,
    });

    expect(users.length).toBe(3);

    users = await StaffServiceGetStaffIdsbyGroup({
      group: staffGroupB.group,
      shop,
    });

    expect(users.length).toBe(1);
  });
});
