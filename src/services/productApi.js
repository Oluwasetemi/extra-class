const BASE_URL = "https://api.oluwasetemi.dev";

/**
 * Fetch products from the API with pagination
 * @param {number} page - Page number to fetch
 * @param {number} limit - Number of items per page
 * @returns {Promise<Object>} Product data with metadata
 */
export async function fetchProducts(page = 1, limit = 20) {
  try {
    const response = await fetch(
      `${BASE_URL}/products?limit=${limit}&page=${page}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
