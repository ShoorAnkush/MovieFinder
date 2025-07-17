import { MovieCard } from "../components/MovieCard";
import "../css/Favorites.css";

export const Favorites = ({ favorites, setFavorites }) => {
    return (
        <div className="favorites-container">
            <div className="favorites-list">
                {favorites.length === 0 ? (
                    <div className="favorites-empty">
                        <h2> No Favorite Movies Yet</h2>
                        <p>Start adding Movies to see them here!</p>
                    </div>
                ) : (
                    <div className="movie-grid">
                        {favorites.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                favorites={favorites}
                                setFavorites={setFavorites} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};