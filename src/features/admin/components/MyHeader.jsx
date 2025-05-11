import PropTypes from "prop-types";

export function MyHeader({ activeTab, setActiveTab }) {
  return (
    <header className="w-full bg-white border-b p-4 shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4 md:mb-0 text-gray-700">
          Admin Panel
        </h2>

        <ul className="flex flex-wrap gap-4">
          <li>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-2 rounded-lg font-medium ${activeTab ===
              "dashboard"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"}`}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("movies")}
              className={`px-4 py-2 rounded-lg font-medium ${activeTab ===
              "movies"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"}`}
            >
              Movies
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("series")}
              className={`px-4 py-2 rounded-lg font-medium ${activeTab ===
              "series"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"}`}
            >
              Series
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

MyHeader.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired
};
