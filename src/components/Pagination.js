/**
 * Calculate pagination range for display
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 * @returns {Array} Array of page numbers or ellipsis
 */
function getPaginationRange(currentPage, totalPages) {
  const delta = 2; // Number of pages to show on each side of current page
  const range = [];
  const rangeWithDots = [];
  let l;

  // Always show first page
  range.push(1);

  // Calculate range around current page
  for (let i = currentPage - delta; i <= currentPage + delta; i++) {
    if (i > 1 && i < totalPages) {
      range.push(i);
    }
  }

  // Always show last page
  if (totalPages > 1) {
    range.push(totalPages);
  }

  // Add ellipsis where needed
  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
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
 * @returns {HTMLDivElement} Pagination container element
 */
export function createPaginationButtons() {
  const container = document.createElement("div");
  container.classList.add("pagination-container");

  // Mobile pagination (simple prev/next)
  const mobileNav = document.createElement("div");
  mobileNav.classList.add("pagination-mobile");

  const mobilePrev = document.createElement("button");
  mobilePrev.classList.add("pagination-mobile-button", "prev-button-mobile");
  mobilePrev.textContent = "Previous";

  const mobileNext = document.createElement("button");
  mobileNext.classList.add("pagination-mobile-button", "next-button-mobile");
  mobileNext.textContent = "Next";

  mobileNav.appendChild(mobilePrev);
  mobileNav.appendChild(mobileNext);

  // Desktop pagination (full navigation)
  const desktopNav = document.createElement("div");
  desktopNav.classList.add("pagination-desktop");

  // Info text
  const info = document.createElement("div");
  info.innerHTML = `
    <p class="pagination-info">
      Showing
      <span class="pagination-info-number pagination-start">1</span>
      to
      <span class="pagination-info-number pagination-end">10</span>
      of
      <span class="pagination-info-number pagination-total">0</span>
      results
    </p>
  `;

  // Navigation buttons
  const navWrapper = document.createElement("div");
  const nav = document.createElement("nav");
  nav.setAttribute("aria-label", "Pagination");
  nav.classList.add("pagination-nav");

  // Previous arrow button
  const prevArrow = document.createElement("button");
  prevArrow.classList.add(
    // "pagination-button",
    "pagination-arrow",
    "prev-button",
  );
  const prevSrOnly = document.createElement("span");
  prevSrOnly.classList.add("sr-only");
  prevSrOnly.textContent = "Previous";
  prevArrow.appendChild(prevSrOnly);
  prevArrow.appendChild(createArrowIcon("left"));

  nav.appendChild(prevArrow);

  // Page numbers container
  const pageNumbersContainer = document.createElement("span");
  pageNumbersContainer.classList.add("page-numbers-container");
  nav.appendChild(pageNumbersContainer);

  // Next arrow button
  const nextArrow = document.createElement("button");
  nextArrow.classList.add(
    // "pagination-button",
    "pagination-arrow",
    "next-button",
  );
  const nextSrOnly = document.createElement("span");
  nextSrOnly.classList.add("sr-only");
  nextSrOnly.textContent = "Next";
  nextArrow.appendChild(nextSrOnly);
  nextArrow.appendChild(createArrowIcon("right"));

  nav.appendChild(nextArrow);
  navWrapper.appendChild(nav);

  desktopNav.appendChild(info);
  desktopNav.appendChild(navWrapper);

  container.appendChild(mobileNav);
  container.appendChild(desktopNav);

  return container;
}

/**
 * Update pagination page numbers and info
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 * @param {number} limit - Items per page
 * @param {number} totalItems - Total number of items
 */
export function updatePageNumber(
  currentPage,
  totalPages,
  limit = 20,
  totalItems = 0,
) {
  // Update info text
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

  // Update page numbers
  const pageNumbersContainer = document.querySelector(
    ".page-numbers-container",
  );
  if (!pageNumbersContainer) return;

  pageNumbersContainer.innerHTML = "";

  const pageRange = getPaginationRange(currentPage, totalPages);

  pageRange.forEach((page, index) => {
    if (page === "...") {
      const ellipsis = document.createElement("span");
      ellipsis.classList.add("pagination-ellipsis");
      ellipsis.textContent = "...";
      pageNumbersContainer.appendChild(ellipsis);
    } else {
      const button = document.createElement("button");
      button.classList.add("pagination-button");
      button.textContent = page;
      button.dataset.page = page;

      // Add active class to current page
      if (page === currentPage) {
        button.classList.add("pagination-button-active");
        button.setAttribute("aria-current", "page");
      }

      // Add hidden class for pages 3 and 8 on mobile
      if (index > 1 && index < pageRange.length - 2) {
        button.classList.add("pagination-hidden-md");
      }

      pageNumbersContainer.appendChild(button);
    }
  });
}

/**
 * Update button states based on pagination metadata
 * @param {boolean} hasNextPage - Whether there is a next page
 * @param {boolean} hasPreviousPage - Whether there is a previous page
 */
export function updateButtonStates(hasNextPage, hasPreviousPage) {
  // Desktop buttons
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");

  if (prevButton) {
    prevButton.disabled = !hasPreviousPage;
  }

  if (nextButton) {
    nextButton.disabled = !hasNextPage;
  }

  // Mobile buttons
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
 * @param {Function} onPageClick - Callback for page number click
 */
export function setupPaginationHandlers(onNext, onPrevious, onPageClick) {
  // Desktop arrow buttons
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");

  if (prevButton) {
    prevButton.onclick = onPrevious;
  }

  if (nextButton) {
    nextButton.onclick = onNext;
  }

  // Mobile buttons
  const prevButtonMobile = document.querySelector(".prev-button-mobile");
  const nextButtonMobile = document.querySelector(".next-button-mobile");

  if (prevButtonMobile) {
    prevButtonMobile.onclick = onPrevious;
  }

  if (nextButtonMobile) {
    nextButtonMobile.onclick = onNext;
  }

  // Page number buttons (desktop only)
  if (onPageClick) {
    const pageNumbersContainer = document.querySelector(
      ".page-numbers-container",
    );
    if (pageNumbersContainer) {
      pageNumbersContainer.addEventListener("click", (e) => {
        if (
          e.target.classList.contains("pagination-button") &&
          e.target.dataset.page
        ) {
          const page = parseInt(e.target.dataset.page, 10);
          onPageClick(page);
        }
      });
    }
  }
}
