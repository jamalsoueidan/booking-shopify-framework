import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import React from "react";
import { Route, Routes } from "react-router";
import { PagesStaffRoutes } from "./pages-staff";

export const Basic = withApplication(
  () => (
    <Routes>
      <Route path="/staff/*" element={<PagesStaffRoutes />} />
    </Routes>
  ),
  { initialEntries: ["/staff"] },
);
