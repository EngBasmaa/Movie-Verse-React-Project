import { Link } from "react-router-dom";

export function Header() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/movies">Movies</Link>
            <Link to="/series">Series</Link>
            <Link to="/admin"> Admin</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
