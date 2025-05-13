import React from "react";
import { Button } from "./MyButton";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      <div className="relative w-full max-w-2xl">
        <div className="relative bg-black rounded-lg p-8 md:p-12 border-8 border-gray-700 shadow-2xl">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwMDAiLz48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiB4PSIwIiB5PSIwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')]"></div>

            <div className="text-center relative z-10">
              <div className="text-8xl md:text-9xl font-bold text-white mb-4">
                <span className="text-red-500">4</span>
                <span className="text-gray-300">0</span>
                <span className="text-red-500">4</span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                This Page Could Not Be Found
              </h1>

              <p className="text-gray-400 mb-6 max-w-md">
                You can either stay and chill here, or go back to beginning
              </p>

              <Link to="/">
                <Button
                  variant="secondary"
                  size="lg"
                  className="px-8 py-3 text-lg"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>

          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <div className="w-8 h-8 rounded-full bg-gray-700"></div>
            <div className="w-8 h-8 rounded-full bg-gray-700"></div>
            <div className="w-8 h-8 rounded-full bg-gray-700"></div>
          </div>
        </div>

        <div className="mx-auto w-32 h-4 bg-gray-800 rounded-b-lg"></div>
        <div className="mx-auto w-48 h-2 bg-gray-700 rounded-b-lg"></div>
      </div>
    </div>
  );
}
