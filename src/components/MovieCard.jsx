import "../css/MovieCard.css";
import { FaStar, FaRegStar } from "react-icons/fa";

export const MovieCard = ({ movie, genreList, favorites, setFavorites }) => {

    const toggleFavorite = () => {
        const isAlreadyFav = favorites.some(fav => fav.id === movie.id);

        if (isAlreadyFav) {
            setFavorites(favorites.filter(fav => fav.id !== movie.id));
        } else {
            setFavorites([...favorites, movie]);
        }
    };

    const genreNames = movie.genre_ids.map(id => {
        const genre = genreList && genreList.find(g => g.id === id);
        return genre ? genre.name : "Unknown";
    });

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.Title} />
                <div className="movie-overlay">
                    <button
                        className="favorite-btn"
                        onClick={toggleFavorite}> 
                        {favorites.some(fav => fav.id === movie.id) ? (
                            <FaStar size={20} color="#ffcc00" />
                             ) : (
                                <FaRegStar size={20} color="#ffffff" />
                             )}
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>Genre: {genreNames.join(", ")}</p>
                <p>Year: {movie.release_date?.split("-")[0]}</p>
                <p>Rating: {movie.vote_average?.toFixed(1)}</p>
                <p>Plot: {movie.overview} </p>
            </div>
        </div>
    );
};