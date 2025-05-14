import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { SharedLayout } from "./SharedLayout";
import { Home } from "../../features/home";
import { NotFound } from "../../shared/components";
import { AdminLayout } from "../../features/admin/pages/AdminLayout";
import { Movies } from "../../features/movies";
import { People } from "../../features/people/pages/People";
import { ActorDetails } from "../../features/people/pages/PersonDetails";
import { Series } from "../../features/series/pages/Series";
import { MovieForm } from "../../features/admin/pages/MovieForm";
import { SeriesForm } from "../../features/admin/pages/SeriesForm";
import { MediaDetails } from "../../features/movies/pages/MediaDetails";
import WatchlistPage from "../../features/movies/pages/WatchlistPage/WatchlistPage";
import Login from "../../features/auth/page/Login.jsx";
import ProtectedRoute from "../../shared/components/ProtectedRoute.jsx";
import { SeriesDetails } from "../../features/series/pages/SeriesDetails.jsx";

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
          <Route path="series/:id" element={<SeriesDetails />} />
          {/* Auth */}
          <Route path="login" element={<Login />} />
          {/* admin */}
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/:tab"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/:id/editMovie"
            element={
              <ProtectedRoute>
                <MovieForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/:id/editSeries"
            element={
              <ProtectedRoute>
                <SeriesForm />
              </ProtectedRoute>
            }
          />
          {/* Media Details */}
          <Route path="media/:type/:id" element={<MediaDetails />} />
          {/* Watchlist */}
          <Route path="/watchlist" element={<WatchlistPage />} />

          {/* people */}
          <Route path="people" element={<People />} />
          <Route path="people/:id" element={<ActorDetails />} />
          {/* NOTFOUND */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
