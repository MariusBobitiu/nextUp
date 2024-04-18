import Loading from '@/components/layout/Loading'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

type CategoriesProps = {
  children?: React.ReactNode
}

type categoryProps = {
  id: number
  name: string
}

const CategoriesLayout = ({ children }: CategoriesProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { categoryId } = useParams()
  const [activeCategory, setActiveCategory] = useState<string>('' as string)

  const fetchCategories = async () => {
    const apiUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/genre/movie/list?language=en-UK&api_key=${import.meta.env.VITE_TMDB_API_KEY}`

    const res = await fetch(apiUrl)
    if (!res.ok) {
      throw new Error('Network response was not ok: ' + res.status)
    }

    const data = await res.json()
    return data.genres
  }

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery('categories', fetchCategories, {
    onSuccess: (data) => {
      const initialCategory = data.find(
        (cat: categoryProps) => cat.id === Number(categoryId)
      )
      if (initialCategory) setActiveCategory(initialCategory.name)
    },
  })

  useEffect(() => {
    if (!categories) return
    const active = categories.find(
      (cat: categoryProps) =>
        cat.id === Number(location.pathname.split('/').pop())
    )
    if (active) {
      setActiveCategory(active.name)
      document.title = `Next Up - Categories | ${active.name}`
    }
  }, [location.pathname, categories])

  const selectCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const category = categories.find(
      (category: categoryProps) => category.name === e.currentTarget.textContent
    )
    if (category) {
      setActiveCategory(category.name) // Set active category
      navigate(`/categories/${category.id}`)
    }
  }

  if (isLoading) return <Loading />
  if (error)
    return <div className="w-full text-center">Error fetching categories!</div>

  return (
    <>
      <div className="grid size-full grid-cols-12 p-24">
        <aside className="col-span-2">
          <h1 className="mb-4 font-display text-2xl">Categories</h1>
          <ul className="flex flex-col gap-2 text-xl text-light-blue-500">
            {categories.map((category: categoryProps) => (
              <li key={category.id}>
                <button
                  className={`hover:text-accent-teal-700 ${activeCategory === category.name && 'text-accent-teal-400'}`}
                  onClick={selectCategory}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <div className="col-span-10 flex flex-col gap-4">{children}</div>
      </div>
    </>
  )
}

export default CategoriesLayout
