export const getTrendingMovies = async () => {
    try {
    const res = await fetch(`${process.env.NEXT_TMDB_API_BASE_URL}/trending/movie/week?api_key=${process.env.NEXT_TMDB_API_KEY}`)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    };
    const data = await res.json()
    return data.results
    } catch (error) {
        console.error(error);
    }
}

export const getGenres = async () => {
    const res = await fetch(`${process.env.NEXT_TMDB_API_BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_TMDB_API_KEY}`)
    const data = await res.json()
    return data.genres
};

export const getMovie = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_TMDB_API_BASE_URL}/movie/${id}?api_key=${process.env.NEXT_TMDB_API_KEY}`)
    const data = await res.json()
    return data
};

export const getMovieByTitle = async (title: string) => {
    const res = await fetch(`${process.env.NEXT_TMDB_API_BASE_URL}/search/movie?api_key=${process.env.NEXT_TMDB_API_KEY}&query=${title}`)
    const data = await res.json()
    return data
};

export const getMovieByGenre = async (genre: number) => {
    const res = await fetch(`${process.env.NEXT_TMDB_API_BASE_URL}/discover/movie?api_key=${process.env.NEXT_TMDB_API_KEY}&with_genres=${genre}`)
    const data = await res.json()
    return data.results
};