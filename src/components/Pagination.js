/**
 * Create pagination buttons container
 * @returns {HTMLDivElement} Pagination buttons element
 */
export function createPaginationButtons() {
  const paginationButtons = document.createElement("div");
  paginationButtons.classList.add("pagination-buttons");
  paginationButtons.innerHTML = `
    <button class="pagination-button prev-button" id="prev-button">Previous</button>
    <span class="pagination-page-number" id="page-number">loading...</span>
    <button class="pagination-button next-button" id="next-button">Next</button>
  `;
  return paginationButtons;
}

/**
 * Update pagination page number display
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 */
export function updatePageNumber(currentPage, totalPages) {
  const pageNumberSpan = document.querySelector(".pagination-page-number");
  if (pageNumberSpan) {
    pageNumberSpan.textContent = `${currentPage} of ${totalPages}`;
  }
}

/**
 * Update button states based on pagination metadata
 * @param {boolean} hasNextPage - Whether there is a next page
 * @param {boolean} hasPreviousPage - Whether there is a previous page
 */
export function updateButtonStates(hasNextPage, hasPreviousPage) {
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");

  if (prevButton) {
    prevButton.disabled = !hasPreviousPage;
    if (hasPreviousPage) {
      prevButton.classList.remove("disabled");
    } else {
      prevButton.classList.add("disabled");
    }
  }

  if (nextButton) {
    nextButton.disabled = !hasNextPage;
    if (hasNextPage) {
      nextButton.classList.remove("disabled");
    } else {
      nextButton.classList.add("disabled");
    }
  }
}

/**
 * Setup pagination event handlers
 * @param {Function} onNext - Callback for next button click
 * @param {Function} onPrevious - Callback for previous button click
 */
export function setupPaginationHandlers(onNext, onPrevious) {
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");

  if (nextButton) {
    nextButton.onclick = onNext;
  }

  if (prevButton) {
    prevButton.onclick = onPrevious;
  }
}
