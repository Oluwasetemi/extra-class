import { useState, useEffect } from "react";
import { fetchProducts } from "./services/productApi.js";
import ProductList from "./components/ProductList.jsx";
import Pagination from "./components/Pagination.jsx";

/**
 * Main App component
 * @returns {JSX.Element}
 */
export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const limit = 20;

  /**
   * Load products for a given page
   * @param {number} page - Page number to load
   */
  async function loadProducts(page) {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchProducts(page, limit);

      // Update state with fetched data
      if (data.meta) {
        setCurrentPage(data.meta.page || page);
        setTotalPages(data.meta.totalPages || 1);
        setHasNextPage(data.meta.hasNextPage || false);
        setHasPreviousPage(data.meta.hasPreviousPage || false);
      }

      if (data.data) {
        setProducts(data.data);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error loading products:", err);
      setError("Error, Failed to fetch products");
      setLoading(false);
    }
  }

  /**
   * Handle next page button click
   */
  function handleNextPage() {
    if (hasNextPage) {
      loadProducts(currentPage + 1);
    }
  }

  /**
   * Handle previous page button click
   */
  function handlePreviousPage() {
    if (hasPreviousPage) {
      loadProducts(currentPage - 1);
    }
  }

  // Load initial products on mount
  useEffect(() => {
    loadProducts(currentPage);
  }, []);

  return (
    <>
      <ProductList products={products} loading={loading} error={error} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onNext={handleNextPage}
        onPrevious={handlePreviousPage}
      />
    </>
  );
}
