import { useEffect, useState } from "react";
import { MovieCard } from "../components/MovieCard"
import "../css/Home.css"
import { searchMovies, getPopularMovies, fetchGenres, discoverMovies } from "../services/api";

export const Home = ({ favorites, setFavorites }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [genreList, setGenreList] = useState([]);
    const [selectGenre, setSelectGenre] = useState("");
    const [selectRating, setSelectRating] = useState("");

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err)
                setError("Failed to load movies...");
            }
            finally {
                setLoading(false);
            }
        };

        loadPopularMovies();
    }, []);

    useEffect(() => {
        const loadGenres = async () => {
            try {
                const genres = await fetchGenres();
                setGenreList(genres);

            } catch (err) {
                console.log("Failed to fetch genres...", err);
            }
        };

        loadGenres();
    }, [])

    useEffect(() => {
        const appplyFilters = async () => {
            setLoading(true);
            try {
                const results = await discoverMovies({
                    genre: selectGenre,
                    rating: selectRating
                });
                setMovies(results);
            } catch (err) {
                console.log("Filter error:", err);
                setError("Failed to apply filters.");
            } finally {
                setLoading(false);
            }
        };

        if (selectGenre || selectRating) {
            appplyFilters();
        }
    },
        [selectGenre, selectRating]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setLoading(true);
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
                setError(null);
            } catch (err) {
                console.log(err);
                setError("Failed to load popular movies...");
            } finally {
                setLoading(false);
            }
            return;
        };

        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to search movie...");
        } finally {
            setLoading(false)
        }
    };

    let filteredMovies = movies;

    if (selectGenre) {
        filteredMovies = filteredMovies.filter((movie) =>
            movie.genre_ids?.includes(parseInt(selectGenre))
        );
    }

    if (selectRating) {
        filteredMovies = filteredMovies.filter(
            (movie) => movie.vote_average >= parseFloat(selectRating)
        );
    }

    return (
        <div className="Home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for Movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    type="submit"
                    className="search-button">
                    Search
                </button>
            </form>
            <div className="filters">
                <select
                    value={selectGenre}
                    onChange={(e) => setSelectGenre(e.target.value)}
                    className="genre-select">
                    <option value="">All Genres</option>
                    {genreList.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>

                <select
                    value={selectRating}
                    onChange={(e) => setSelectRating(e.target.value)}
                    className="rating-select">
                    <option value="">All Ratings</option>
                    {[9, 8, 7, 6, 5].map((rating) => (
                        <option key={rating} value={rating}>
                            {rating}+
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="reset-btn"
                    onClick={() => {
                        setSearchQuery("");
                        setSelectGenre("");
                        setSelectRating("");
                        setLoading(true);
                        getPopularMovies().then(setMovies).finally(() => setLoading(false));
                    }}>
                    Reset
                </button>
            </div>

            <div className="movies-grid">
                {filteredMovies.map((movie) => (
                    <MovieCard movie={movie}
                        genreList={genreList}
                        key={movie.id}
                        favorites={favorites}
                        setFavorites={setFavorites} />
                ))}
            </div>
        </div>
    )
}