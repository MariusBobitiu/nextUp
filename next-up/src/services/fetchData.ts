export const fetchMovie = async (movieId: string) => {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    console.log('Fetching movie details from:', apiUrl)

    const res = await fetch(apiUrl)
    if (!res.ok) {
        throw new Error('Network response was not ok ' + res.status)
    }

    const data = await res.json()
    return data
}

export const fetchCredits = async (movieId: string) => {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    console.log('Fetching movie cast from:', apiUrl)

    const res = await fetch(apiUrl)
    if (!res.ok) {
        throw new Error('Network response was not ok ' + res.status)
    }

    const data = await res.json()
    return data
}

export const fetchReleaseDateGB = async (movieId: string) => {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${movieId}/release_dates?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    console.log('Fetching movie release dates from:', apiUrl)

    const res = await fetch(apiUrl)
    if (!res.ok) {
        throw new Error('Network response was not ok ' + res.status)
    }

    const data = await res.json()
    return data
}

export const fetchKeywords = async (movieId: string) => {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${movieId}/keywords?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    console.log('Fetching movie keywords from:', apiUrl)

    const res = await fetch(apiUrl)
    if (!res.ok) {
        throw new Error('Network response was not ok ' + res.status)
    }

    const data = await res.json()
    return data
}

export const fetchImages = async (movieId: string) => {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${movieId}/images?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    console.log('Fetching movie images from:', apiUrl)

    const res = await fetch(apiUrl)
    if (!res.ok) {
        throw new Error('Network response was not ok ' + res.status)
    }

    const data = await res.json()
    return data
}

export const fetchVideos = async (movieId: string) => {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${movieId}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    console.log('Fetching movie videos from:', apiUrl)

    const res = await fetch(apiUrl)
    if (!res.ok) {
        throw new Error('Network response was not ok ' + res.status)
    }

    const data = await res.json()
    return data
}

export const fetchReviews = async (movieId: string) => {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${movieId}/reviews?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    console.log('Fetching movie reviews from:', apiUrl)

    const res = await fetch(apiUrl)
    if (!res.ok) {
        throw new Error('Network response was not ok ' + res.status)
    }

    const data = await res.json()
    return data
}
