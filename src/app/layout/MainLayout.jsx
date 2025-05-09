import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SharedLayout } from "./SharedLayout";
import { Home } from "../../features/home";
import { NotFound } from "../../shared/components";
import { AdminLayout } from "../../features/admin/pages/AdminLayout";
import { MovieDetails, Movies } from "../../features/movies";
import MovieForm from "../../features/admin/pages/MovieForm";
import { People } from "../../features/people/pages/People";
import { PersonDetails } from "../../features/people/pages/PersonDetails";

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
          {/* PEOPLE */}
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:id" element={<MovieDetails />} />
          {/* ADMIN */}
          <Route path="people" element={<People />} />
          <Route path="people/:id" element={<PersonDetails />} />
          {/* NOTFOUND */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
