export const fetchMovie = async (movieId: string) => {
  try {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`

    const res = await fetch(apiUrl)
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.status)
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching movie:', error)
    throw error
  }
}

export const fetchCredits = async (movieId: string) => {
  try {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`

    const res = await fetch(apiUrl)
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.status)
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching credits:', error)
    throw error
  }
}

export const fetchReleaseDateGB = async (movieId: string) => {
  try {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${movieId}/release_dates?api_key=${import.meta.env.VITE_TMDB_API_KEY}`

    const res = await fetch(apiUrl)
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.status)
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching release dates:', error)
    throw error
  }
}

export const fetchKeywords = async (movieId: string) => {
  try {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${movieId}/keywords?api_key=${import.meta.env.VITE_TMDB_API_KEY}`

    const res = await fetch(apiUrl)
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.status)
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching keywords:', error)
    throw error
  }
}

export const fetchImages = async (movieId: string) => {
  try {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${movieId}/images?api_key=${import.meta.env.VITE_TMDB_API_KEY}`

    const res = await fetch(apiUrl)
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.status)
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching images:', error)
    throw error
  }
}

export const fetchVideos = async (movieId: string) => {
  try {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${movieId}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`

    const res = await fetch(apiUrl)
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.status)
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching videos:', error)
    throw error
  }
}

export const fetchReviews = async (movieId: string) => {
  try {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${movieId}/reviews?api_key=${import.meta.env.VITE_TMDB_API_KEY}`

    const res = await fetch(apiUrl)
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.status)
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching reviews:', error)
    throw error
  }
}

export const fetchSimilarMovies = async (movieId: string) => {
  try {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${movieId}/similar?api_key=${import.meta.env.VITE_TMDB_API_KEY}`

    const res = await fetch(apiUrl)
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.status)
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching similar movies:', error)
    throw error
  }
}

export const fetchRecommendations = async (movieId: string) => {
  try {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${movieId}/recommendations?api_key=${import.meta.env.VITE_TMDB_API_KEY}`

    const res = await fetch(apiUrl)
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.status)
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    throw error
  }
}

export const fetchUserWatchlist = async (username: string) => {
  try {
    const apiUrl = `${import.meta.env.VITE_SV_API_BASE_URL}/movies/${username}/watchlist`

    const res = await fetch(apiUrl)
    if (!res.ok) {
      throw new Error('Network response was not ok: ' + res.status)
    }

    return (await res.json()).data
  } catch (error) {
    throw error
  }
}
