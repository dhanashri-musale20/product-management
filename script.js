 // Sample products array
const products = [
   { name: 'Laptop', price: 1000, stock: 10, category: 'Electronics' },
   { name: 'Phone', price: 500, stock: 20, category: 'Electronics' },
   { name: 'Shoes', price: 80, stock: 15, category: 'Apparel' },
   { name: 'Watch', price: 200, stock: 5, category: 'Accessories' },
];

// DOM elements
const showProductsButton = document.getElementById('showProducts');
const productTableBody = document.querySelector('#productTable tbody');
const totalStockElement = document.getElementById('totalStock');
const averagePriceElement = document.getElementById('averagePrice');
const highestProductElement = document.getElementById('highestProduct');
const searchBar = document.getElementById('searchBar');
const addProductForm = document.getElementById('addProductForm');

// Function to display products
function displayProducts(filter = '') {
   productTableBody.innerHTML = '';
   const filteredProducts = filter
       ? products.filter(product => product.category.toLowerCase().includes(filter.toLowerCase()))
       : products;
   
   filteredProducts.forEach(product => {
       const row = document.createElement('tr');
       row.innerHTML = `
           <td>${product.name}</td>
           <td>₹${product.price}</td>
           <td>${product.stock}</td>
           <td>${product.category}</td>
       `;
       productTableBody.appendChild(row);
   });
   calculateStats(filteredProducts);
}

// Function to calculate and display stats
function calculateStats(productsArray) {
   const totalStock = productsArray.reduce((sum, product) => sum + product.stock, 0);
   const averagePrice = (productsArray.reduce((sum, product) => sum + product.price, 0) / productsArray.length) || 0;
   const highestProduct = productsArray.reduce((max, product) => product.price > max.price ? product : max, productsArray[0] || {});

   totalStockElement.textContent = totalStock;
   averagePriceElement.textContent = `₹${averagePrice.toFixed(2)}`;
   highestProductElement.textContent = `${highestProduct.name || 'N/A'} (${highestProduct.category || 'N/A'})`;
}

// Event listeners
showProductsButton.addEventListener('click', () => displayProducts());
searchBar.addEventListener('input', () => displayProducts(searchBar.value));

addProductForm.addEventListener('submit', event => {
   event.preventDefault();

   const newProduct = {
       name: document.getElementById('productName').value,
       price: parseFloat(document.getElementById('productPrice').value),
       stock: parseInt(document.getElementById('productStock').value, 10),
       category: document.getElementById('productCategory').value,
   };

   products.push(newProduct);
   addProductForm.reset();
   displayProducts();
});
