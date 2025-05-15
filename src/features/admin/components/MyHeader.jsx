import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext.js";

export function MyHeader({ activeTab, onTabChange }) {
  const { logout, setIsHeader } = useContext(AuthContext);

  setIsHeader(true);

  return (
    <header className="w-full bg-gradient-to-r from-zinc-900 to-zinc-800 border-b border-zinc-700 p-4 shadow-lg mb-10 sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-500 bg-clip-text text-transparent">
            Admin Panel
          </h2>
          <span className="ml-2 text-xs bg-pink-600 text-white px-2 py-1 rounded-full">
            PRO
          </span>
        </div>

        <nav className="flex items-center gap-2">
          <ul className="flex flex-wrap items-center gap-2">
            {["dashboard", "movies", "series"].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => onTabChange(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-zinc-700 hover:text-white"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              </li>
            ))}
          </ul>

          <div className="h-6 w-px bg-zinc-600 mx-2 hidden md:block"></div>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-gray-300 hover:bg-zinc-700 hover:text-white group"
          >
            <span>Logout</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-pink-500 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}

MyHeader.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};
