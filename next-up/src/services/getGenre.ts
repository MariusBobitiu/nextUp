const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" }
];

const TVGenres = [
    { id: 10759, name: "Action & Adventure"},
    { id: 16, name: "Animation"},
    { id: 35, name: "Comedy"},
    { id: 80, name: "Crime"},
    { id: 99, name: "Documentary"},
    { id: 18, name: "Drama"},
    { id: 10751, name: "Family"},
    { id: 10762, name: "Kids"},
    { id: 9648, name: "Mystery"},
    { id: 10763, name: "News"},
    { id: 10764, name: "Reality"},
    { id: 10765, name: "Sci-Fi & Fantasy"},
    { id: 10766, name: "Soap"},
    { id: 10767, name: "Talk"},
    { id: 10768, name: "War & Politics"},
    { id: 37, name: "Western"}
]


/**
 * Function to get the genre name by ID.
 * @param {number} id - The genre ID.
 * @return {string|null} The name of the genre, or null if not found.
 */

const getMovieGenre = (id : number) => {
    const movieGenre = genres.find(genre => genre.id === id);
    return movieGenre ? movieGenre.name : null;
}
const getTVGenre = (id : number) => {
    const tvGenre = TVGenres.find(genre => genre.id === id);
    return tvGenre ? tvGenre.name : null;
}

export { getMovieGenre, getTVGenre };