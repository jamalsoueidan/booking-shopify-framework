import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { PagesBookingRoutes } from "./pages-booking";

export const BasicPagesBooking = withApplication(
  () => (
    <Routes>
      <Route path="/staff/*" element={<PagesBookingRoutes />} />
    </Routes>
  ),
  {
    initialEntries: ["/staff"],
  },
);
