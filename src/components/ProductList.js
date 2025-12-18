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
 * Create a product item element
 * @param {Object} product - Product data
 * @returns {HTMLLIElement} Product item element
 */
function createProductItem(product) {
  const images = parseProductImages(product.images);
  const finalImage = images[0] || product.image || "";

  // Create list item
  const productItem = document.createElement("li");
  productItem.classList.add("product-item");

  // Create link wrapper
  const link = document.createElement("a");
  link.href = "#";
  link.classList.add("product-item-link");

  // Create image wrapper
  const imageWrapper = document.createElement("div");
  imageWrapper.classList.add("product-image-wrapper");

  // Create image
  const imageElement = document.createElement("img");
  imageElement.src = finalImage;
  imageElement.alt = product.name;
  imageElement.classList.add("product-image");

  imageWrapper.appendChild(imageElement);

  // Create product details container
  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("product-details");

  // Create product info container
  const productInfo = document.createElement("div");
  productInfo.classList.add("product-info");

  // Create product name
  const productName = document.createElement("h3");
  productName.classList.add("product-name");
  productName.textContent = product.name;

  productInfo.appendChild(productName);

  // Add description if available
  if (product.description) {
    const description = document.createElement("p");
    description.classList.add("product-description");
    description.textContent = product.description;
    productInfo.appendChild(description);
  }

  detailsContainer.appendChild(productInfo);

  // Add price if available
  if (product.price) {
    const price = document.createElement("p");
    price.classList.add("product-price");
    price.textContent = `$${product.price}`;
    detailsContainer.appendChild(price);
  }

  // Assemble the structure
  link.appendChild(imageWrapper);
  link.appendChild(detailsContainer);
  productItem.appendChild(link);

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
 * @returns {Array} [containerDiv, productListUL] - Container elements
 */
export function createProductListContainer() {
  // Create outer container
  const container = document.createElement("div");
  container.classList.add("product-list-container");

  // Create wrapper
  const wrapper = document.createElement("div");
  wrapper.classList.add("product-list-wrapper");

  // Create title
  const title = document.createElement("h2");
  title.classList.add("product-list-title");
  title.textContent = "Products";

  // Create product grid (ul)
  const productList = document.createElement("ul");
  productList.classList.add("product-grid");

  // Assemble structure
  wrapper.appendChild(title);
  wrapper.appendChild(productList);
  container.appendChild(wrapper);

  return [container, productList];
}

/**
 * Show loading state
 * @param {HTMLDivElement} container - Product container div
 */
export function showLoading(container) {
  const wrapper = container.querySelector(".product-list-wrapper");
  if (wrapper) {
    wrapper.innerHTML = "<div>loading...</div>";
  }
}

/**
 * Show error state
 * @param {HTMLDivElement} container - Product container div
 * @param {string} message - Error message
 */
export function showError(
  container,
  message = "Error, Failed to fetch products",
) {
  const wrapper = container.querySelector(".product-list-wrapper");
  if (wrapper) {
    wrapper.innerHTML = `<div>${message}</div>`;
  }
}

/**
 * Show products
 * @param {HTMLDivElement} container - Product container div
 * @param {HTMLUListElement} productList - Product list UL element
 */
export function showProducts(container, productList) {
  const wrapper = container.querySelector(".product-list-wrapper");
  if (wrapper) {
    // Clear and recreate structure
    wrapper.innerHTML = "";

    const title = document.createElement("h2");
    title.classList.add("product-list-title");
    title.textContent = "Products";

    wrapper.appendChild(title);
    wrapper.appendChild(productList);
  }
}
