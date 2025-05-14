import React from "react";
import { Button } from "../../../../shared/components/MyButton";
import { Play } from "lucide-react";
import { MovieCard } from "../../../../shared/components/MovieCard";
import RouteLayout from "./RootLayout";
import { Link } from "react-router-dom";
export function Hero() {
  return (
    <div
      className="w-full h-screen bg-cover bg-no-repeat md:bg-center bg-right"
      style={{
        backgroundImage:
          "url(https://image.tmdb.org/t/p/original/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg)",
      }}
    >
      <RouteLayout
        className={
          "w-full flex-1 h-full flex justify-center flex-col bg-gradient-to-t from-black/100 via-black/30 to-transparent p-4 md:p-8 lg:p-12"
        }
      >
        <div className="md:w-1/2 w-full h-full space-y-8 flex flex-col justify-center">
          <div className="space-y-4">
            {/* Movie Info */}
            <div className="w-full flex items-center gap-4 mb-4">
              <div className="bg-red-600 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                <span>7.8/10</span>
              </div>
              <span className="text-white text-sm">Sci-Fi</span>
              <span className="text-white text-sm">Apr 17, 2016</span>
              <div className="border bg-zinc-950 border-gray-400 text-gray-300 px-2 py-1 rounded-md text-xs font-medium">
                13+
              </div>
            </div>
            {/* title */}
            <h1 className="md:text-6xl text-4xl text-white font-bold anton uppercase tracking-widest leading-tight">
              Thunderbolts
            </h1>
            {/* cast */}
            <div className="flex items-center gap-x-2 text-gray-300 font-medium flex-wrap">
              <span className="text-sm whitespace-nowrap">Starring:</span>
              <Link
                to="/"
                className="hover:text-red-500 ease-in-out duration-300 text-white-400 hover:underline font-semibold text-base mr-1" // Added mr-1
              >
                Florence Pugh,
              </Link>
              <Link
                to="/"
                className="hover:text-red-500 ease-in-out duration-300 text-white-400 hover:underline font-semibold text-base"
              >
                Sebastian stan
              </Link>
            </div>
            {/* description */}
            <div className="text-gray-200 font-normal line-clamp-3 md:pr-10 pr-0">
              After finding themselves ensnared in a death trap, seven
              disillusioned castoffs must embark on a dangerous mission that
              will force them to confront the darkest corners of their pasts.
            </div>
          </div>
          {/* button */}
          <div className="flex items-start gap-5">
            <Link to="/media/movie/986056">
              <Button
                variant="secondary"
                size="lg"
                className=" flex items-center gap-2 "
              >
                <Play className="w-4 h-4" /> Movie Details
              </Button>
            </Link>
          </div>
        </div>
      </RouteLayout>
    </div>
  );
}
