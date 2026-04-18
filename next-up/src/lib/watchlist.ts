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

		return data;
	} catch (error) {
		throw error // Will be caught by the caller to handle the error appropriately
	}
};

export const removeFromWatchlist = async (username: string, movieId: number) => {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_SV_API_BASE_URL}/movies/${username}/watchlist/${movieId}`,
			{
				method: 'DELETE',
			}
		)
		if (!response.ok) {
			throw new Error('Failed to remove movie from watchlist')
		}
		return true
	} catch (error) {
		throw error // Will be caught by the caller to handle the error appropriately
	}
}
