import { Link } from "react-router-dom"
import "../css/NavBar.css"

export const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Movie Finder</Link>
            </div>

            <div className="navbar-links">
                <Link to="/" className="nav-links">Home</Link>
                <Link to="/favorites" className="nav-links">Favorites</Link>
            </div>
        </nav>
    )
}