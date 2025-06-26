import { Link, useLocation, useNavigate } from "react-router-dom";
import Home from '../assets/Home.svg?react'
import Topics from '../assets/Topics.svg?react';
import MyTopics from '../assets/MyTopics.svg?react';

function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleTopicsClick = (e) => {
        if (location.pathname === '/topics') {
            // Force a state reset by pushing to the same route with a key
            navigate('/topics', { state: { reset: Date.now() } });
            e.preventDefault();
        }
    };

    return (
        <nav>
            <Link to="/">
                <Home style={{
                    width: 30, height: 30, verticalAlign: 'middle', pointerEvents: 'none'
                }} />
                Home
            </Link>
            <Link to="/topics" onClick={handleTopicsClick}>
                <Topics style={{
                    width: 30, height: 30, verticalAlign: 'middle', pointerEvents: 'none'
                }} />
                Topics
            </Link>
            <Link to="/MyTopics">
                <MyTopics style={{
                    width: 30, height: 30, verticalAlign: 'middle', pointerEvents: 'none'
                }} />
                My Topics
            </Link>
        </nav>
    );
}

export default NavBar;
