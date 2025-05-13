import PropTypes from "prop-types";

export function MyHeader({ activeTab, onTabChange }) {
  return <header className="w-full bg-zinc-900 border-b border-zinc-700 p-4 shadow-md mb-10">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4 md:mb-0 text-white">
          Admin Panel
        </h2>

        <ul className="flex flex-wrap gap-4">
          {["dashboard", "movies", "series"].map(tab => <li key={tab}>
              <button onClick={() => onTabChange(tab)} className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${activeTab === tab ? "bg-pink-700 text-white" : "text-gray-300 hover:bg-zinc-700 hover:text-white"}`}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>)}
        </ul>
      </div>
    </header>;
}

MyHeader.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired
};
