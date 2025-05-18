interface ProductsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ProductsPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: ProductsPaginationProps) => {
  // Generate page numbers to show (with ellipsis for many pages)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(maxVisiblePages / 2);
      let start = currentPage - half;
      let end = currentPage + half;

      if (start < 1) {
        start = 1;
        end = maxVisiblePages;
      }

      if (end > totalPages) {
        end = totalPages;
        start = totalPages - maxVisiblePages + 1;
      }

      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center mt-4">
      <div className="flex gap-1">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="w-10 h-10 flex items-center justify-center"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`w-10 h-10 rounded-full ${
                page === currentPage
                  ? "bg-purple-700 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};
export default ProductsPagination;
