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
import { Series } from "../../features/series/pages/Series";
import { SeriesDetails } from "../../features/series/pages/SeriesDetails";

export default function MainLayout() {
  return (
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<SharedLayout />}>
          {/* HOME */}
          <Route index element={<Home />} />
          {/* MOVIES */}
          <Route path="movies" element={<Movies />} />
          {/* SERIES */}
          <Route path="series" element={<Series />} />

          {/* admin */}
          <Route
            path="admin"
            element={<Navigate to="admin/dashbord" replace />}
          />
          <Route path="admin/:tab" element={<AdminLayout />} />
          <Route path="admin/:id/editMovie" element={<MovieForm />} />
          <Route path="admin/:id/editSeries" element={<SeriesForm />} />
          {/* Media Details */}
          <Route path="media/:type/:id" element={<MediaDetails />} />
          {/* people */}
          <Route path="people" element={<People />} />
          <Route path="people/:id" element={<PersonDetails />} />
          {/* NOTFOUND */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
