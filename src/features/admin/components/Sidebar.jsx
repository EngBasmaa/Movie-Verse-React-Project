export function Sidebar({ activeTab, setActiveTab }) {
  return <aside className="col-span-2 bg-white border-r p-4 shadow-md">
      <h2 className="text-xl font-semibold mb-12 mt-4 border-2 border-gray-200 rounded text-center text-gray-700">
        Admin Panel
      </h2>
      <ul className="space-y-3">
        <li>
          <button onClick={() => setActiveTab("dashboard")} className={`w-full text-left px-4 py-2 rounded-lg font-medium ${activeTab === "dashboard" ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}>
            Dashboard
          </button>
        </li>
        <li>
          <button onClick={() => setActiveTab("movies")} className={`w-full text-left px-4 py-2 rounded-lg font-medium ${activeTab === "movies" ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}>
            Movies
          </button>
        </li>
        <li>
          <button onClick={() => setActiveTab("series")} className={`w-full text-left px-4 py-2 rounded-lg font-medium ${activeTab === "series" ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}>
            Series
          </button>
        </li>
      </ul>
    </aside>;
}
