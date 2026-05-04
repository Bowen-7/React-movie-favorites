import MovieCard from "../components/MovieCard";
function Home() {
    const movie = {
        id: 1,
        title: "Test Movie",
        release_date: "2024-01-01",
        poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    };

    return (
        <div className="home">
            <MovieCard movie={movie} />
        </div>
    );
}

export default Home; 
