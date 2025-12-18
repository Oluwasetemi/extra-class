import "./style.css";
import { fetchProducts } from "./services/productApi.js";
import {
  createProductListContainer,
  renderProducts,
  showLoading,
  showError,
  showProducts,
} from "./components/ProductList.js";
import {
  createPaginationButtons,
  updatePageNumber,
  updateButtonStates,
  setupPaginationHandlers,
} from "./components/Pagination.js";
import { appState } from "./utils/state.js";

// Get app container
const app = document.querySelector("#app");

// Create UI elements
const [productDiv, productList] = createProductListContainer();
const paginationButtons = createPaginationButtons();

// Append elements to DOM
app.appendChild(productDiv);

/**
 * Load and display products for a given page
 * @param {number} page - Page number to load
 */
async function loadProducts(page) {
  try {
    showLoading(productDiv);

    const data = await fetchProducts(page, appState.limit);

    // Update application state
    appState.update(data);

    // Render products
    renderProducts(appState.getProducts(), productList);
    showProducts(productDiv, productList);

    // Calculate total items from metadata
    const totalItems =
      data.meta?.total || appState.getTotalPages() * appState.limit;

    // Update pagination UI
    updatePageNumber(
      appState.getCurrentPage(),
      appState.getTotalPages(),
      appState.limit,
      totalItems,
    );
    updateButtonStates(
      appState.getHasNextPage(),
      appState.getHasPreviousPage(),
    );
  } catch (error) {
    console.error("Error loading products:", error);
    showError(productDiv);
  }
}

/**
 * Handle next page button click
 */
async function handleNextPage() {
  appState.nextPage();
  await loadProducts(appState.getCurrentPage());
}

/**
 * Handle previous page button click
 */
async function handlePreviousPage() {
  appState.previousPage();
  await loadProducts(appState.getCurrentPage());
}

/**
 * Handle page number button click
 * @param {number} page - Page number to load
 */
async function handlePageClick(page) {
  await loadProducts(page);
}

/**
 * Initialize the application
 */
async function init() {
  // Append pagination buttons to DOM
  app.appendChild(paginationButtons);

  // Setup pagination event handlers
  setupPaginationHandlers(handleNextPage, handlePreviousPage, handlePageClick);

  // Load initial products
  await loadProducts(appState.getCurrentPage());
}

// Start the application
init();
