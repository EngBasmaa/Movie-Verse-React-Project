import { Link } from "react-router-dom";

export default function PersonCard({ person }) {
  return (
    <div className="person-card">
      <Link to={`/people/${person.id}`}>
        <img
          src={person.profile_url || "default-profile.jpg"}
          alt={person.name}
          width={100}
        />
        <h3>{person.name}</h3>
      </Link>
      <p>{person.known_for_department}</p>
    </div>
  );
}
