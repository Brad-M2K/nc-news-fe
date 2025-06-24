import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/Topics">Topics</Link>
            <Link to="My Topics">My Topics</Link>
        </nav>
    );
}

export default NavBar;
