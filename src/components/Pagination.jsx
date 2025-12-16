/**
 * Pagination component - handles page navigation
 * @param {Object} props - Component props
 * @param {number} props.currentPage - Current page number
 * @param {number} props.totalPages - Total number of pages
 * @param {boolean} props.hasNextPage - Whether there is a next page
 * @param {boolean} props.hasPreviousPage - Whether there is a previous page
 * @param {Function} props.onNext - Callback for next button click
 * @param {Function} props.onPrevious - Callback for previous button click
 * @returns {JSX.Element}
 */
export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  hasNextPage = false,
  hasPreviousPage = false,
  onNext,
  onPrevious,
}) {
  return (
    <div className="pagination-buttons">
      <button
        className={`pagination-button prev-button ${!hasPreviousPage ? "disabled" : ""}`}
        onClick={onPrevious}
        disabled={!hasPreviousPage}
      >
        Previous
      </button>
      <span className="pagination-page-number">
        {currentPage} of {totalPages}
      </span>
      <button
        className={`pagination-button next-button ${!hasNextPage ? "disabled" : ""}`}
        onClick={onNext}
        disabled={!hasNextPage}
      >
        Next
      </button>
    </div>
  );
}
