import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { AlphaCard } from "@shopify/polaris";
import React from "react";
import { StaffAvatarStack } from "./staff-avatar-stack";

const staff = [
  {
    __v: 0,
    _id: "63bb71c898f50e4f24c883a8",
    active: true,
    address: "adwijo",
    avatar: "https://www.w3schools.com/w3images/avatar6.png",
    email: "jamal@soueidan.com",
    fullname: "jamalsoueidan",
    group: "all",
    phone: "4531317428",
    position: "1",
    postal: 8220,
    shop: "testeriphone.myshopify.com",
  },
  {
    __v: 0,
    _id: "63de6b91769dac4d74557426",
    active: true,
    address: "sdadsioj",
    avatar: "https://www.w3schools.com/w3images/avatar6.png",
    email: "sarasoueidan@gmail.com",
    fullname: "sara soueidan",
    group: "all",
    phone: "4512345678",
    position: "2",
    postal: 8220,
    shop: "testeriphone.myshopify.com",
  },
  {
    __v: 0,
    _id: "fessef",
    active: true,
    address: "sdadsioj",
    avatar: "https://www.w3schools.com/w3images/avatar6.png",
    email: "sarasoueidan@gmail.com",
    fullname: "sara soueidan",
    group: "all",
    phone: "4512345678",
    position: "2",
    postal: 8220,
    shop: "testeriphone.myshopify.com",
  },
];

export const BasicLarge = withApplication(
  () => (
    <AlphaCard>
      <StaffAvatarStack staff={staff} size="large" />
    </AlphaCard>
  ),
  { title: "Size: large" },
);

export const BasicSmall = withApplication(
  () => (
    <AlphaCard>
      <StaffAvatarStack staff={staff} size="small" />
    </AlphaCard>
  ),
  { title: "Size: small" },
);

export const BasicSmallRight = withApplication(
  () => (
    <AlphaCard>
      <StaffAvatarStack staff={staff} size="small" align="right" />
    </AlphaCard>
  ),
  { title: "Align: right" },
);
