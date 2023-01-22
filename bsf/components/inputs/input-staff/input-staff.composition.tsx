import React from "react";
import { InputStaff } from "./input-staff";
import { useField } from "@shopify/react-form";
import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { Card } from "@shopify/polaris";

const data = [
  {
    staff: "63bb71c898f50e4f24c883a8",
    shop: "testeriphone.myshopify.com",
    fullname: "jamal swueidan",
    email: "jamal@soueidan.com",
    postal: 9000,
    address: "jiodaw",
    phone: "4531317428",
    active: true,
    group: "all",
    tag: "jamal",
  },
  {
    staff: "63bb71e798f50e4f24c883b9",
    shop: "testeriphone.myshopify.com",
    fullname: "sara soueidan",
    email: "souseidan@gmail.com",
    postal: 8000,
    address: "oiawdjio",
    phone: "4531317429",
    active: true,
    group: "all",
    tag: "ahmad",
  },
];

export const BasicInputStaff = () => {
  const field = useField("");
  return (
    <ApplicationFramePage>
      <Card title="no optionLabel" sectioned>
        <InputStaff data={data} {...field} />
      </Card>

      <Card title="optionLabel" sectioned>
        <InputStaff data={data} {...field} optionLabel="Vælg medarbejder" />
      </Card>
    </ApplicationFramePage>
  );
};
