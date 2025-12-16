/**
 * Parse product images from string or array format
 * @param {string|Array} images - Product images data
 * @returns {Array} Parsed images array
 */
function parseProductImages(images) {
  try {
    return typeof images === "string" ? JSON.parse(images) : images;
  } catch (err) {
    console.error("Error parsing product images:", err);
    return [];
  }
}

/**
 * ProductItem component - displays a single product
 * @param {Object} props - Component props
 * @param {Object} props.product - Product data
 * @returns {JSX.Element}
 */
function ProductItem({ product }) {
  const images = parseProductImages(product.images);
  const finalImage = images[0] || product.image || null;

  return (
    <div className="product-item">
      <img src={finalImage} alt={product.name} className="product-image" />
      {product.name}
    </div>
  );
}

/**
 * ProductList component - displays a list of products
 * @param {Object} props - Component props
 * @param {Array} props.products - Array of product data
 * @param {boolean} props.loading - Loading state
 * @param {string} props.error - Error message
 * @returns {JSX.Element}
 */
export default function ProductList({
  products = [],
  loading = false,
  error = null,
}) {
  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <ul>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}
