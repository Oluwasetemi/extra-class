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
 * Create a product image element
 * @param {string} src - Image source URL
 * @param {string} alt - Image alt text
 * @returns {HTMLImageElement} Image element
 */
function createProductImage(src, alt) {
  const imageElement = document.createElement("img");
  imageElement.src = src;
  imageElement.alt = alt;
  imageElement.classList.add("product-image");
  return imageElement;
}

/**
 * Create a product item element
 * @param {Object} product - Product data
 * @returns {HTMLDivElement} Product item element
 */
function createProductItem(product) {
  const images = parseProductImages(product.images);
  const finalImage = images[0] || product.image || "";

  const imageElement = createProductImage(finalImage, product.name);

  const productItem = document.createElement("div");
  productItem.classList.add("product-item");
  productItem.appendChild(imageElement);
  productItem.appendChild(document.createTextNode(product.name));

  return productItem;
}

/**
 * Render products to the product list
 * @param {Array} products - Array of product data
 * @param {HTMLUListElement} productListElement - UL element to render products into
 */
export function renderProducts(products, productListElement) {
  // Clear existing products
  productListElement.innerHTML = "";

  products.forEach((product) => {
    const productItem = createProductItem(product);
    productListElement.appendChild(productItem);
  });
}

/**
 * Create the product list container
 * @returns {Object} Container elements
 */
export function createProductListContainer() {
  const productDiv = document.createElement("div");
  productDiv.textContent = "loading...";

  const productList = document.createElement("ul");

  return [ productDiv, productList ];
}

/**
 * Show loading state
 * @param {HTMLDivElement} productDiv - Product container div
 */
export function showLoading(productDiv) {
  productDiv.textContent = "loading...";
}

/**
 * Show error state
 * @param {HTMLDivElement} productDiv - Product container div
 * @param {string} message - Error message
 */
export function showError(
  productDiv,
  message = "Error, Failed to fetch products",
) {
  productDiv.textContent = message;
}

/**
 * Show products
 * @param {HTMLDivElement} productDiv - Product container div
 * @param {HTMLUListElement} productList - Product list UL element
 */
export function showProducts(productDiv, productList) {
  productDiv.textContent = "";
  productDiv.appendChild(productList);
}
