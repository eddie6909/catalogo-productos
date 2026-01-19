const DB_KEY = 'products_db';

function getProducts() {
  return JSON.parse(localStorage.getItem(DB_KEY)) || [];
}

function saveProducts(products) {
  localStorage.setItem(DB_KEY, JSON.stringify(products));
}

