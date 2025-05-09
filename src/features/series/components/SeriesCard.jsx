import { Link } from "react-router-dom";

export default function SeriesCard({ series }) {
  return (
    <div className="series-card">
      <Link to={`/series/${series.id}`}>
        <img
          src={series.poster_url || "default-poster.jpg"}
          alt={series.title}
          width={100}
        />
        <h3>{series.title}</h3>
      </Link>
      <p>{series.genres.join(", ")}</p>
    </div>
  );
}