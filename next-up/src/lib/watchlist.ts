export const addToWatchlist = async (username: string, movieId: number) => {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_SV_API_BASE_URL}/movies/${username}/watchlist`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					movieId: movieId,
				}),
			}
		)
		if (!response.ok) {
			throw new Error('Failed to add movie to watchlist')
		}
		const data = await response.json()
		console.log('Movie added to watchlist:', data)

		return data;
	} catch (error) {
		console.error('Error adding movie to watchlist:', error)
		throw error
	}
} 


export const removeFromWatchList = async (username: string, movieId: number) => {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_SV_API_BASE_URL}/movies/${username}/watchlist`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					movieId: movieId,
				}),
			}
		);

		if (!response.ok) {
			throw new Error('Failed to remove movie from watchlist')
		}

		const data = await response.json()
		console.log('Movie removed from watchlist:', data)

		return data;
	} catch (error) {
		console.error('Error removing movie from watchlist:', error)
		throw error
	}
};