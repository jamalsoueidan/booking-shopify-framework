import React from "react";
import { Route, Routes } from "react-router-dom";
import { Create } from "./pages/create";
import { Edit } from "./pages/edit";
import { List } from "./pages/list";
import { View } from "./pages/view";

export const PagesBookingRoutes = () => (
  <Routes>
    <Route path="/new" element={<Create />} />
    <Route path="/edit/:id" element={<Edit />} />
    <Route path="/:id" element={<View />} />
    <Route index element={<List />} />
  </Routes>
);
