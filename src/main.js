import './style.css'


const BASE_URL = 'https://api.oluwasetemi.dev'

const app = document.querySelector('#app')
let products = [];
let productDiv = document.createElement('div');
productDiv.textContent = 'loading...'
const productList = document.createElement('ul');

app.appendChild(productDiv)

let currentPage = 1;
let totalPages;
let limit = 20;
let hasNextPage = false;
let hasPreviousPage = false;

// pagination buttons div
const paginationButtons = document.createElement('div');
paginationButtons.classList.add('pagination-buttons');
paginationButtons.innerHTML = `
  <button class="pagination-button prev-button" id="prev-button">Previous</button>
  <span class="pagination-page-number" id="page-number">loading...</span>
  <button class="pagination-button next-button" id="next-button">Next</button>
`;

async function fetchProduct(page) {
  const response = await fetch(`${BASE_URL}/products?limit=20&page=${page}`);
  return await response.json();
}


fetch(`${BASE_URL}/products?limit=20`)
  .then(response => response.json())
  .then(data => {
    currentPage = data.meta.page;
    totalPages = data.meta.totalPages;
    hasNextPage = data.meta.hasNextPage;
    hasPreviousPage = data.meta.hasPreviousPage;
    
    app.appendChild(paginationButtons);

  // page number span
  const pageNumberSpan = document.querySelector('.pagination-page-number');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');

    if (hasNextPage) {
      // click next button
      nextButton.onclick = async function() {
        currentPage += 1
        const result = await fetchProduct(currentPage)
        // process the result
        console.log(result)
        productDisplay(result)
        updatePaginationData(currentPage, totalPages, pageNumberSpan)
        if (currentPage >= 2) {
          prevButton.disabled = false;
          prevButton.classList.remove('disabled');
        }
      }
      
    } else {
      // next button disabled
      nextButton.disabled = true;
      nextButton.classList.add('disabled');
    }

    if (hasPreviousPage) {
      // previous button
    } else {
      // previous button disabled
      prevButton.disabled = true;
      prevButton.classList.add('disabled');
    }

    pageNumberSpan.textContent = `${currentPage} of ${totalPages}`;
    // a function to create the product and image
    productDisplay(data)
    productDiv.textContent = '';
    productDiv.appendChild(productList);
  })
  .catch(error => {
    console.error('Error:', error)
    productDiv.textContent = 'Error, Failed to fetch products';
  })

function productDisplay(data) {
  data.data.forEach(product => {
    console.log(product.images)
    try {
      product.images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images
    }
    catch(err) {
      product.image = ''
    }
    product.finalImage = product.images[0] || product.image;

    // image element
    const imageElement = document.createElement('img');
    imageElement.src = product.finalImage;
    imageElement.alt = product.name;
    imageElement.classList.add('product-image');

    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.appendChild(imageElement);
    productItem.appendChild(document.createTextNode(product.name));
    productList.appendChild(productItem);
  })

  return productList
}

function updatePaginationData(currentPage, totalPages, pageNumberSpan) {
  // const pageNumberSpan = document.querySelector('.pagination-page-number');
  pageNumberSpan.textContent = `${currentPage} of ${totalPages}`;
}