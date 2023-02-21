import { faker } from "@faker-js/faker";
import { ProductServiceUpdate } from "@jamalsoueidan/bsb.services.product";
import { StaffRole } from "@jamalsoueidan/bsb.types.staff";
import { Tag } from "@jamalsoueidan/bsb.types.tag";
import { createAppExpress } from "@jamalsoueidan/bsd.testing-library.express";
import {
  createProduct,
  createStaffWithSchedule,
  createStaffWithScheduleAndUpdateProduct,
  shop,
} from "@jamalsoueidan/bsd.testing-library.mongodb";
import { widgetRouteStaff } from "../widget.routes";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

const productId = parseInt(faker.random.numeric(10), 10);

describe("Application: widget staff route admin test", () => {
  it("Admin: Should only be able to get all users part of his group", async () => {
    const product = await createProduct({ productId });
    const tag = Tag.all_day;
    const { staff } = await createStaffWithScheduleAndUpdateProduct({
      group: "a",
      product,
      role: StaffRole.admin,
      tag,
    });

    const { staff: staff2 } = await createStaffWithSchedule({
      group: "a",
      tag,
    });

    // another group staff
    await createStaffWithSchedule({
      group: "b",
      tag,
    });

    await ProductServiceUpdate(
      {
        id: product._id,
        shop,
      },
      {
        staff: [
          { _id: staff._id, tag },
          { _id: staff2._id, tag },
        ],
      },
    );

    // create another staff in the same product
    const request = createAppExpress(widgetRouteStaff, staff);

    const res = await request
      .get(`/widget/staff?productId=${product.productId}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.length).toEqual(2);
  });
});
