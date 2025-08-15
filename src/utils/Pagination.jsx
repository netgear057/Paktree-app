import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Pagination({ setPage, totalItems, itemsPerPage, currentPage }) {
  
  const numberOfPages = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);

  const goToPage = (page) => {
    if (page >= 1 && page <= numberOfPages) {
      setPage(page);
    }
  };
  return (
    <div className="w-full flex justify-center py-4">
      <nav aria-label="Pagination" className="inline-flex -space-x-px rounded-md shadow-sm">
        {/* Previous */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-2 text-gray-400 ring-1 ring-gray-300 hover:bg-gray-50 disabled:opacity-50 rounded-l-md"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>

        {/* Page numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-4 py-2 text-sm font-medium ring-1 ring-gray-300 ${
              currentPage === page
                ? 'bg-indigo-600 text-white'
                : 'text-gray-900 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === numberOfPages}
          className="px-2 py-2 text-gray-400 ring-1 ring-gray-300 hover:bg-gray-50 disabled:opacity-50 rounded-r-md"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </nav>
    </div>
  );
}
