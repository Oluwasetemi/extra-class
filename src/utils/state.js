/**
 * Application state manager
 */
class AppState {
  constructor() {
    this.currentPage = 1;
    this.totalPages = 1;
    this.limit = 20;
    this.hasNextPage = false;
    this.hasPreviousPage = false;
    this.products = [];
  }

  /**
   * Update state with new data
   * @param {Object} data - Data to update state with
   */
  update(data) {
    if (data.meta) {
      this.currentPage = data.meta.page || this.currentPage;
      this.totalPages = data.meta.totalPages || this.totalPages;
      this.hasNextPage = data.meta.hasNextPage || false;
      this.hasPreviousPage = data.meta.hasPreviousPage || false;
    }

    if (data.data) {
      this.products = data.data;
    }
  }

  /**
   * Get current page number
   * @returns {number} Current page
   */
  getCurrentPage() {
    return this.currentPage;
  }

  /**
   * Get total pages
   * @returns {number} Total pages
   */
  getTotalPages() {
    return this.totalPages;
  }

  /**
   * Check if there's a next page
   * @returns {boolean} Has next page
   */
  getHasNextPage() {
    return this.hasNextPage;
  }

  /**
   * Check if there's a previous page
   * @returns {boolean} Has previous page
   */
  getHasPreviousPage() {
    return this.hasPreviousPage;
  }

  /**
   * Get products
   * @returns {Array} Products array
   */
  getProducts() {
    return this.products;
  }

  /**
   * Increment current page
   */
  nextPage() {
    if (this.hasNextPage) {
      this.currentPage += 1;
    }
  }

  /**
   * Decrement current page
   */
  previousPage() {
    if (this.hasPreviousPage) {
      this.currentPage -= 1;
    }
  }
}

export const appState = new AppState();
