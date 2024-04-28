import Loading from '@/components/layout/Loading'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

type CategoriesProps = {
  children?: React.ReactNode
}

type CategoryProps = {
  id: number
  name: string
}

type ActiveCategory = {
  id: number
  name: string
  type: 'movie' | 'tv'
}

const fetchMovieCategories = async () => {
  const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/genre/movie/list?language=en-UK&api_key=${import.meta.env.VITE_TMDB_API_KEY}`

  const res = await fetch(apiUrl)
  if (!res.ok) {
    throw new Error('Network response was not ok: ' + res.status)
  }

  const data = await res.json()
  return data.genres
}

const fetchTVCategories = async () => {
  const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/genre/tv/list?language=en-UK&api_key=${import.meta.env.VITE_TMDB_API_KEY}`

  const res = await fetch(apiUrl)
  if (!res.ok) {
    throw new Error('Network response was not ok: ' + res.status)
  }

  const data = await res.json()
  return data.genres
}

const CategoriesLayout = ({ children }: CategoriesProps) => {
  const navigate = useNavigate()
  // const location = useLocation()
  const { categoryId } = useParams()
  const [activeCategory, setActiveCategory] = useState<ActiveCategory | null>(
    null
  )

  const {
    data: movieCategories,
    isLoading: movieLoading,
    error: movieError,
  } = useQuery<CategoryProps[]>('movieCategories', fetchMovieCategories)
  const {
    data: tvCategories,
    isLoading: tvLoading,
    error: tvError,
  } = useQuery<CategoryProps[]>('tvCategories', fetchTVCategories)

  const isLoading = movieLoading || tvLoading
  const error = movieError || tvError

  useEffect(() => {
    if (!movieCategories || !tvCategories) return
    const movieActive = movieCategories.find(
      (cat: CategoryProps) =>
        cat.id === Number(location.pathname.split('/').pop())
    )
    const tvActive = tvCategories.find(
      (cat: CategoryProps) =>
        cat.id === Number(location.pathname.split('/').pop())
    )
    if (movieActive) {
      setActiveCategory({
        id: movieActive.id,
        name: movieActive.name,
        type: 'movie',
      })
      document.title = `Next Up - Categories | ${movieActive.name}`
    } else if (tvActive) {
      setActiveCategory({ id: tvActive.id, name: tvActive.name, type: 'tv' })
      document.title = `Next Up - Categories | ${tvActive.name}`
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, movieCategories, tvCategories])

  useEffect(() => {
    // Function to find and set active category
    const findCategory = (
      categories: CategoryProps[],
      type: 'movie' | 'tv'
    ) => {
      const category = categories.find((cat) => cat.id === Number(categoryId))
      if (category) {
        setActiveCategory({ id: category.id, name: category.name, type })
        document.title = `Next Up - Categories | ${category.name}`
      }
    }

    if (movieCategories) findCategory(movieCategories, 'movie')
    if (tvCategories) findCategory(tvCategories, 'tv')
  }, [categoryId, movieCategories, tvCategories, setActiveCategory])

  const selectCategory = (category: CategoryProps, type: 'movie' | 'tv') => {
    setActiveCategory({ id: category.id, name: category.name, type })
    navigate(`/categories/${type}/${category.id}`)
  }

  if (isLoading) return <Loading />
  if (error)
    return <div className="w-full text-center">Error fetching categories!</div>

  return (
    <>
      <div className="grid size-full grid-cols-12 overflow-scroll p-24">
        <aside className="col-span-2">
          <h1 className="mb-4 font-display text-2xl">Movies</h1>
          <ul className="flex flex-col gap-2 text-xl text-light-blue-500">
            {movieCategories?.map((category: CategoryProps) => (
              <li key={category.id}>
                <button
                  className={`hover:text-light-blue-700 ${activeCategory?.type === 'movie' && activeCategory?.name === category.name && 'text-accent-teal-400 hover:text-accent-teal-400'}`}
                  onClick={() => selectCategory(category, 'movie')}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
          <h1 className="mb-4 mt-6 font-display text-2xl">TV Series</h1>
          <ul className="flex flex-col gap-2 text-xl text-light-blue-500">
            {tvCategories?.map((category: CategoryProps) => (
              <li key={category.id}>
                <button
                  className={`hover:text-light-blue-700 ${activeCategory?.type === 'tv' && activeCategory?.name === category.name && 'text-accent-teal-400 hover:text-accent-teal-400'}`}
                  onClick={() => selectCategory(category, 'tv')}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <div className="col-span-10 flex flex-col gap-4 overflow-y-scroll">
          {children}
        </div>
      </div>
    </>
  )
}

export default CategoriesLayout
