import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Search = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    if (location.search) {
      const searchParams = new URLSearchParams(location.search)
      const searchTerm = searchParams.get('search')
      setSearchTerm(searchTerm || '')
    }
  }, [location.search])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const searchTerm = new FormData(e.currentTarget).get('searchField')
        navigate(`/search?search=${searchTerm}&page=1`)
      }}
    >
      <div className="relative mx-auto max-w-4xl">
        <MagnifyingGlass
          className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-gray-400"
          aria-hidden
        />
        <input
          type="search"
          name="searchField"
          value={searchTerm}
          autoComplete="off"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full rounded-2xl border border-secondary-800 bg-secondary-700 p-4 pl-10 text-sm text-white placeholder-gray-400 outline-none focus:border-accent-teal-500"
          required
        />
        <button
          type="submit"
          className="absolute bottom-2.5 right-2.5 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-700 focus:outline-none focus:ring-4 focus:ring-accent-teal-800"
        >
          Search
        </button>
      </div>
    </form>
  )
}

function MagnifyingGlass({ className, ...props }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  )
}

export default Search
