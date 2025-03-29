import Loading from '@/components/layout/Loading'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

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
  const location = useLocation();
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    console.log("Location: ", location.pathname)
    console.log("ID: ", id)
  }, [location.pathname, id])

  const [activeCategory, setActiveCategory] = useState<ActiveCategory | null>(
    null
  )

  const {
    data: movieCategories,
    isLoading: movieLoading,
    isError: movieError,
  } = useQuery<CategoryProps[]>('movieCategories', fetchMovieCategories)
  const {
    data: tvCategories,
    isLoading: tvLoading,
    isError: tvError,
  } = useQuery<CategoryProps[]>({
    queryKey: 'tvCategories', 
    queryFn: fetchTVCategories,
    placeholderData: [],
    enabled: !!movieCategories,
    keepPreviousData: true,
  })

  useEffect(() => {
    if (!movieCategories || !tvCategories) return;

    const categoryId = id;
    const categoryType = location.pathname.split('/')[2]; // 'movie' or 'tv'
    const categories = categoryType === 'movie' ? movieCategories : tvCategories;
    const category = categories.find((cat) => cat.id === Number(categoryId));
    console.group('Category');
      console.log('Category ID:', categoryId);
      console.log('Category Type:', categoryType);
      console.log('Categories:', categories);
      console.log('Category:', category);
    console.groupEnd();
    if (category) {
      setActiveCategory({ id: category.id, name: category.name, type: categoryType as 'movie' | 'tv' });
      document.title = `Next Up - Categories | ${category.name}`;
    } else {
      setActiveCategory(null);
      document.title = 'Next Up - Categories';
    }
  }, [id, movieCategories, tvCategories, location.pathname])

  const selectCategory = (category: CategoryProps, type: 'movie' | 'tv') => {
    navigate(`/categories/${type}/${category.id}`)
  }

  return (
    <>
      <div className="container mx-auto grid size-full grid-cols-12 gap-8">
        <aside className="col-span-2 h-full overflow-y-auto">
          <h1 className="mb-4 font-display text-2xl">Movies</h1>
          <ul className="text-primary-500 flex flex-col gap-2 text-xl">
            {movieCategories?.map((category: CategoryProps) => (
              <li key={category.id} className={`text-primary-500 hover:text-primary-700 ${activeCategory?.type === 'movie' && category.id === activeCategory?.id && '!text-accent-400 hover:!text-accent-400'}`}>
                <button
                  // className={`hover:text-primary-700 ${activeCategory?.type === 'movie' && activeCategory?.name === category.name && 'text-accent-400 hover:text-accent-400'}`}
                  onClick={() => selectCategory(category, 'movie')}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
          <h1 className="mb-4 mt-6 font-display text-2xl">TV Series</h1>
          <ul className="text-primary-500 flex flex-col gap-2 text-xl">
            {tvCategories?.map((category: CategoryProps) => (
              <li key={category.id} className={`text-primary-500 hover:text-primary-700 ${activeCategory?.type === 'tv' && category.id === activeCategory?.id && '!text-accent-400 hover:!text-accent-400'}`}>
                <button
                  // className={`hover:text-primary-700 ${location.pathname.split('/')[2] === 'tv' && category?.id === parseInt(id ?? '0') && 'text-accent-400 hover:text-accent-400'}`}
                  onClick={() => selectCategory(category, 'tv')}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <div className="col-span-10 flex flex-col gap-4 overflow-y-auto">
          {movieError && tvError ? <>
            <h1 className="text-red-500 text-2xl">
              Something went wrong while fetching categories. Please try again later.
            </h1>
          </> : movieLoading || tvLoading ? (
            <Loading />
          ) : children}
        </div>
      </div>
    </>
  )
}

export default CategoriesLayout
