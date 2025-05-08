import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SharedLayout } from "./SharedLayout";
import { Home } from "../../features/home";
import { NotFound } from "../../shared/components";
import { AdminLayout } from "../../features/admin/pages/AdminLayout";
import { MovieDetails, Movies } from "../../features/movies";

export default function MainLayout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          {/* HOME */}
          <Route index element={<Home />} />
          {/* MOVIES */}
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:id" element={<MovieDetails />} />
          {/* ADMIN */}
          <Route path="admin" element={<AdminLayout />} />
          {/* NOTFOUND */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
