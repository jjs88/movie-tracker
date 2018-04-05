

export async function getPopularMovies() {
  const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=deda70cac4f7fff351b9125d5d6422b1&language=en-US&page=1');
  const movies = await res.json();
  const posterImg = await fetch(`https://image.tmdb.org/t/p/w500/${movies.results[0].poster_path}`);

  //need to make another request to get the poster img
  const newMovies = movies.results.map(async (movie) => {
    const poster_path = await fetch(`https://image.tmdb.org/t/p/w500/${movie.poster_path}`);
    movie.poster_path = poster_path.url;
    return movie;
  });

  return Promise.all(newMovies);
}