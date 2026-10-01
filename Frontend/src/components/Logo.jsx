import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link className="logo" to="/">
      <span className="logo-mark">T</span>
      <span>TaskOrbit</span>
    </Link>
  );
}
