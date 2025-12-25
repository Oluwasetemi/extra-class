// import { range } from "@setemiojo/utils";
import { mk } from "../utils/helper";

// 1, 5 - [1,2,'...',4,5]
function getPaginationRange(currentPage, totalPages) {
  const delta = 2; // Number of pages to show on each side of currentPage;
  const rangeValues = [];
  const rangeWithDots = [];
  let last;
  
  // always show the first and the last page
  rangeValues.push(1);
  
  for (let i = currentPage - delta; i <= currentPage + delta; i++) {
    if (i > 1 && i < totalPages) {
      rangeValues.push(i)
    }
  }
  
  if (totalPages) {
    rangeValues.push(totalPages)
  }
  
  for (let i of rangeValues) { // 1, 2, 3, ..., 4, 5, ..., 10
    if (last) {
      if (i - last === 2) {
        rangeWithDots.push(last+1)
      } else if (i - last !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i);
    last = i;//3
  }
  
  return rangeWithDots
}

/**
 * Create SVG icon for pagination arrows
 * @param {string} direction - 'left' or 'right'
 * @returns {SVGElement} SVG element
 */
function createArrowIcon(direction) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 20 20");
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("aria-hidden", "true");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("clip-rule", "evenodd");
  path.setAttribute("fill-rule", "evenodd");

  if (direction === "left") {
    path.setAttribute(
      "d",
      "M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z",
    );
  } else {
    path.setAttribute(
      "d",
      "M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z",
    );
  }

  svg.appendChild(path);
  return svg;
}


/**
 * Create pagination buttons container
 * @returns {HTMLDivElement} Pagination buttons element
 */
export function createPaginationButtons() {
  let mobilePagination
  const container = mk("div", { className: 'pagination-container' }, [
    // mobile
    (mobilePagination = mk("div", { className: 'pagination-mobile' }, [
      // prev
      mk("button", {className: "pagination-mobile-button prev-button-mobile"}, ['Previous']),
      // next
      mk("button", {className: "pagination-mobile-button next-button-mobile"}, ['Next'])
    ])),
    // fullscreen
    mk("div", {className: "pagination-desktop"}, [
      mk("div", {className: "pagination-info", innerHTML: `
        <p>
          Showing <span class="pagination-info-number pagination-start">1</span>
          to
          <span class="pagination-info-number pagination-end">10</span>
          of
          <span class="pagination-info-number pagination-total">0</span>
          results
        </p>
      `}),
      mk("div", {className: ""}, [
        mk("nav", {className: "pagination-nav", ariaLabel: "Pagination"}, [
          // prev button
          mk("button", {className: "pagination-arrow prev-button"}, [
            mk("span", {className: "sr-only", textContent: "Previous"}),
            createArrowIcon("left"),
          ]),
          // page number (getPaginationRange())
          mk("span", {className: "page-number-container"}),
          // next arrow
          mk("button", {className: "pagination-arrow next-button"}, [
            mk("span", {className: "sr-only", textContent: "Next"}),
            createArrowIcon("right")
          ]),
        ])
      ])
    ])
  ]);
  
  return container;
}

/**
 * Update pagination page number display
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 */
export function updatePageNumber(currentPage, totalPages, limit = 20, totalItems = 0) {
  const startSpan = document.querySelector(".pagination-start");
  const endSpan = document.querySelector(".pagination-end");
  const totalSpan = document.querySelector(".pagination-total");
  
  if (startSpan && endSpan && totalSpan) {
    const start = (currentPage - 1) * limit + 1;
    const end = Math.min(currentPage * limit, totalItems);
    
    startSpan.textContent = start;
    endSpan.textContent = end;
    totalSpan.textContent = totalItems;
  }
  
  const pageNumberSpanContainer = document.querySelector(".page-number-container");
  if (!pageNumberSpanContainer) return 
  pageNumberSpanContainer.innerHTML = "";
  
  const pageRange = getPaginationRange(currentPage, totalPages);
  
  pageRange.forEach((page, index) => {
    if (page === "...") {
      const elipisis = mk("span", { className: "pagination-elipisis" }, [page]);
      pageNumberSpanContainer.appendChild(elipisis)
    } else {
      const button = mk("button", { className: `pagination-button ${page === currentPage ? "pagination-button-active" : ""}`, ariaCurrent: "page" }, [page]);
      button.setAttribute('data-page', page);
      // button.dataset.page = page;
      // hidder some button
      if (index > 1 && index < pageRange.length - 3) { // 3 and 8
        button.classList.add("pagination-hidden-md")
      }
      pageNumberSpanContainer.appendChild(button)
    }
  })
}

/**
 * Update button states based on pagination metadata
 * @param {boolean} hasNextPage - Whether there is a next page
 * @param {boolean} hasPreviousPage - Whether there is a previous page
 */
export function updateButtonStates(hasNextPage, hasPreviousPage) {
  // Desktop
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");

  if (prevButton) {
    prevButton.disabled = !hasPreviousPage;
  }

  if (nextButton) {
    nextButton.disabled = !hasNextPage;
  }
  
  // Mobile
  const prevButtonMobile = document.querySelector(".prev-button-mobile");
  const nextButtonMobile = document.querySelector(".next-button-mobile");
  
  if (prevButtonMobile) {
    prevButtonMobile.disabled = !hasPreviousPage;
  }

  if (nextButtonMobile) {
    nextButtonMobile.disabled = !hasNextPage;
  }
}

/**
 * Setup pagination event handlers
 * @param {Function} onNext - Callback for next button click
 * @param {Function} onPrevious - Callback for previous button click
 */
export function setupPaginationHandlers(onNext, onPrevious, onPageClick) {
  // Desktop
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");

  if (nextButton) {
    nextButton.onclick = onNext;
  }

  if (prevButton) {
    prevButton.onclick = onPrevious;
  }
  
  // Desktop
  const prevButtonMobile = document.querySelector(".prev-button-mobile");
  const nextButtonMobile = document.querySelector(".next-button-mobile");

  if (nextButtonMobile) {
    nextButtonMobile.onclick = onNext;
  }

  // Desktop only
  if (prevButtonMobile) {
    prevButtonMobile.onclick = onPrevious;
  }
  
  if (onPageClick) {
    const pageNumberSpanContainer = document.querySelector(".page-number-container");
    if (!pageNumberSpanContainer) return 
    pageNumberSpanContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("pagination-button") && event.target.dataset.page) {
        const page = parseInt(event.target.dataset.page, 10);
        onPageClick(page);
      }
    })
  }
}
