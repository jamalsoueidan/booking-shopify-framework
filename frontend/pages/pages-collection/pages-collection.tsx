import React from "react";
import { Route, Routes } from "react-router-dom";
import { List } from "./pages/list";
import { View } from "./pages/view";

export const PagesCollectionRoutes = () => (
  <Routes>
    <Route path="/product/:id" element={<View />} />
    <Route index element={<List />} />
  </Routes>
);
