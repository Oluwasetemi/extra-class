import { mk } from "../utils/helper";

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
  imageElement.loading = "lazy";
  imageElement.classList.add("product-image");
  return imageElement;
}

/**
 * Create a product item element
 * @param {Object} product - Product data
 * @returns {HTMLDivElement} Product item element
 */
function createProductItem(product) {
  let productName;
  const images = parseProductImages(product.images);
  const finalImage = images[0] || product.image || "https://placehold.net/default.png";


  const productItem = document.createElement("li");
  productItem.classList.add("product-item");
  
  const link = document.createElement('a');
  link.href = "#"
  link.classList.add('product-item-link');
  
  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add("product-image-wrapper");
  
  const imageElement = createProductImage(finalImage, product.name);
  imageWrapper.appendChild(imageElement);
  
  const productDetailContainer = mk('div', {className: "product-details"}, [
    mk("div", {className: "product-info"}, [
      (productName = mk("h3", {className: "product-name", textContent: `${product.name}`})),
      product?.description ? mk("p", {className: "product-description"}, [product.description]) : '',
    ]),
    product?.price ? mk("p", {className: "product-price"}, [`$${product.price}`]) : ''
  ])
  
  link.appendChild(imageWrapper);
  link.appendChild(productDetailContainer);
  productItem.appendChild(link)

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
  // container 
  const container = document.createElement("div");
  container.classList.add("product-list-container");
  
  // wrapper
  const wrapper = document.createElement("div");
  wrapper.classList.add("product-list-wrapper");
  
  const title = document.createElement("h2");
  title.classList.add("product-list-title");
  title.textContent = "Products";


  const productList = document.createElement("ul");
  productList.classList.add("product-grid");
  
  wrapper.appendChild(title);
  wrapper.appendChild(productList);
  container.appendChild(wrapper);

  return [ container, productList ];
}

/**
 * Show loading state
 * @param {HTMLDivElement} container - Product container div
 */
export function showLoading(container) {
  const wrapper = container.querySelector('.wrapper');
  if (wrapper) {
    wrapper.innerHTML = `<div>loading...</div>`
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
  const wrapper = container.querySelector('.wrapper');
  if (wrapper) {
    wrapper.innerHTML = `<div>${message}</div>`
  }
}

/**
 * Show products
 * @param {HTMLDivElement} container - Product container div
 * @param {HTMLUListElement} productList - Product list UL element
 */
export function showProducts(container, productList) {
  const wrapper = container.querySelector('.wrapper');
  if (wrapper) {
    wrapper.innerHTML = ""
    
    const title = document.createElement("h2");
    title.classList.add("product-list-title");
    title.textContent = "Products";
    
    wrapper.appendChild(title);
    wrapper.appendChild(productList)
  }
}
