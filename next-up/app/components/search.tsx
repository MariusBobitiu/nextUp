'use client'
import { useRouter } from 'next/navigation'

const Search = ({ term }: { term?: string }) => {
  const { push } = useRouter()
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const searchTerm = new FormData(e.currentTarget).get('searchField')
        push(`/?search=${searchTerm}`)
      }}
    >
      <div className="relative max-w-4xl mx-auto">
        <MagnifyingGlass
          className="absolute top-4 left-4 w-5 h-5 text-gray-400 pointer-events-none"
          aria-hidden
        />
        <input
          type="search"
          name="searchField"
          defaultValue={typeof term === 'string' ? decodeURI(term) : ''}
          autoComplete="off"
          className="block w-full p-4 pl-10 text-sm text-white placeholder-gray-400 border rounded-2xl border-navy-700 bg-navy-600 focus:border-accent-teal-800 outline-none"
          required
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-xl text-sm px-4 py-2 bg-accent-teal hover:bg-accent-teal-700 focus:ring-accent-teal-800"
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

export default Search;