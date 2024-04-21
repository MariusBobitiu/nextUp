type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  text_color?: string
  text_hover?: string
  button_bg_color?: string
  button_bg_hover?: string
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  text_color,
  text_hover,
  button_bg_color,
  button_bg_hover,
}) => {
  const renderPageNumbers = () => {
    const items = []
    totalPages = Math.min(totalPages, 500)
    if (totalPages < 4) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i)
      }
    } else {
      items.push(1)

      if (currentPage > 3) {
        items.push('...')
      }

      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      start = Math.max(start, 2)
      if (currentPage < 3) {
        end = 4
      }

      for (let i = start; i <= end; i++) {
        items.push(i)
      }

      if (currentPage < totalPages - 2) {
        items.push('...')
      }

      if (!items.includes(totalPages)) {
        items.push(totalPages)
      }
    }

    return items
  }

  return (
    <div className={`flex w-full items-center justify-center gap-4`}>
      <button
        className={`rounded-lg ${button_bg_color ? button_bg_color : 'bg-navy-400'} px-4 py-2 ${text_color ? text_color : 'text-light-blue-300'} hover:${button_bg_hover ? button_bg_hover : 'bg-navy-500'} disabled:opacity-25 disabled:hover:bg-navy-400 hover:${text_hover ? text_hover : 'text-light-blue-50'}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {renderPageNumbers().map((item, index) =>
        typeof item === 'number' ? (
          <button
            key={index}
            className={`rounded-lg px-4 py-2 ${text_color ? text_color : 'text-light-blue-400'} ${currentPage === item ? (button_bg_color ? button_bg_color : 'bg-navy-300') : ''} hover:${text_hover ? text_hover : 'text-light-blue-100'}`}
            onClick={() => onPageChange(item)}
            disabled={currentPage === item}
          >
            {item}
          </button>
        ) : (
          <span key={index} className="pagination-ellipsis">
            {item}
          </span>
        )
      )}
      <button
        className={`rounded-lg ${button_bg_color ? button_bg_color : 'bg-navy-400'} px-4 py-2 ${text_color ? text_color : 'text-light-blue-300'} hover:${button_bg_hover ? button_bg_hover : 'bg-navy-500'} disabled:opacity-25 disabled:hover:bg-navy-400 hover:${text_hover ? text_hover : 'text-light-blue-50'}`}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
