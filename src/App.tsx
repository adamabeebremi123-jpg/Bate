import React, { useEffect } from 'react'

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

function App() {
  const [movies, setMovies] = React.useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=' 
      + import.meta.env.VITE_TMDB_API_KEY);
      const data = await res.json();
      setMovies(data.results);
    };
    fetchMovies();
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Popular Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-64 object-cover" /> 
            <div className="p-4">
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p className="text-gray-400">{movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App