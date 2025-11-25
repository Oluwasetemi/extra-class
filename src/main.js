import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

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
app.appendChild(paginationButtons);

// page number span
const pageNumberSpan = document.querySelector('.pagination-page-number');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

fetch(`${BASE_URL}/products?limit=20`)
  .then(response => response.json())
  .then(data => {
    currentPage = data.meta.page;
    totalPages = data.meta.totalPages;
    hasNextPage = data.meta.hasNextPage;
    hasPreviousPage = data.meta.hasPreviousPage;

    if (hasNextPage) {
      // next button
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
    data.data.forEach(product => {
      product.images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images
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
    productDiv.textContent = '';
    productDiv.appendChild(productList);
  })
  .catch(error => {
    console.error('Error:', error)
  })
