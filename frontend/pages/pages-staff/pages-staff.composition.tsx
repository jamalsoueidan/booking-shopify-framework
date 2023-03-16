import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import React from "react";
import { PagesStaffRoutes } from "./pages-staff";

export const Basic = withApplication(() => <PagesStaffRoutes />, {
  initialEntries: ["/"],
  isLive: true,
  wrapPage: false,
});
