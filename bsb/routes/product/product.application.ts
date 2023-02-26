/* eslint-disable no-param-reassign */
import { ProductServiceGetById } from "@jamalsoueidan/bsb.services.product";
import { AppControllerProps } from "@jamalsoueidan/bsb.types.api";
import {
  ProductServiceGetAllProps,
  ProductServiceGetAvailableStaffProps,
  ProductServiceGetByIdProps,
  ProductServiceUpdateBodyProps,
  ProductServiceUpdateQueryProps,
} from "@jamalsoueidan/bsb.types.product";
import { StaffRole } from "@jamalsoueidan/bsb.types.staff";

export const productGetAllApp = async ({
  query,
  session,
}: AppControllerProps<ProductServiceGetAllProps>) => {
  if (session.role > StaffRole.admin) {
    query.staff = session.staff;
  }

  query.group = session.group;
};

export const productGetAvailableStaffApp = ({
  query,
  session,
}: AppControllerProps<ProductServiceGetAvailableStaffProps>) => {
  query.group = session.group;
};

export const productGetById = async ({
  query,
  session,
}: AppControllerProps<ProductServiceGetByIdProps>) => {
  query.group = session.group;
};

export const productUpdateApp = async ({
  query,
  body,
  session,
}: AppControllerProps<
  ProductServiceUpdateQueryProps,
  ProductServiceUpdateBodyProps
>) => {
  if (body.staff) {
    // get all current staff in the product
    const product = await ProductServiceGetById({
      id: query.id,
      shop: query.shop,
    });

    // take all staff not belong in the same group
    const staff = product.staff?.filter((s) => s.group !== session.group);
    if (staff) {
      const outsideGroupStaff = staff?.map((s) => ({
        _id: s._id.toString(),
        tag: s.tag,
      }));

      body.staff = [...outsideGroupStaff, ...body.staff];
    }
  }
};
