function getProducts() {
  const data = localStorage.getItem("products");
  return data ? JSON.parse(data) : [];
}

function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}
