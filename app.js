document.addEventListener("DOMContentLoaded", () => {

  // ===== ELEMENTOS =====
  const productList = document.getElementById("productList");
  const addBtn = document.getElementById("addBtn");
  const modal = document.getElementById("modal");
  const cancelBtn = document.getElementById("cancelBtn");
  const saveBtn = document.getElementById("saveBtn");

  const nameInput = document.getElementById("nameInput");
  const brandInput = document.getElementById("brandInput");
  const sizeInput = document.getElementById("sizeInput");
  const buyPriceInput = document.getElementById("buyPriceInput");
  const sellPriceInput = document.getElementById("sellPriceInput");
  const detailInput = document.getElementById("detailInput");
  const searchInput = document.getElementById("searchInput");

  // ===== ESTADO =====
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let editingIndex = null;

  // ===== FUNCIONES =====
  function renderProducts(list = products) {
    productList.innerHTML = "";

    if (list.length === 0) {
      productList.innerHTML = "<p>No hay productos</p>";
      return;
    }

    list.forEach((p, index) => {
      const div = document.createElement("div");
      div.className = "product-card";

      div.innerHTML = `
        <strong>${p.name}</strong><br>
        Marca: ${p.brand}<br>
        Tallas: ${p.size}<br>
        Compra: S/ ${p.buyPrice} | Venta: S/ ${p.sellPrice}<br>
        <small>Modificado: ${p.updatedAt}</small><br><br>
        <button onclick="editProduct(${index})">Editar</button>
        <button onclick="deleteProduct(${index})">Eliminar</button>
      `;

      productList.appendChild(div);
    });
  }

  function openModal() {
    modal.classList.remove("hidden");
  }

  function closeModal() {
    modal.classList.add("hidden");
    clearForm();
    editingIndex = null;
  }

  function clearForm() {
    nameInput.value = "";
    brandInput.value = "";
    sizeInput.value = "";
    buyPriceInput.value = "";
    sellPriceInput.value = "";
    detailInput.value = "";
  }

  function saveProduct() {
    if (!nameInput.value || !buyPriceInput.value || !sellPriceInput.value) {
      alert("Completa los campos obligatorios");
      return;
    }

    const product = {
      name: nameInput.value.trim(),
      brand: brandInput.value.trim(),
      size: sizeInput.value.trim(),
      buyPrice: buyPriceInput.value,
      sellPrice: sellPriceInput.value,
      detail: detailInput.value.trim(),
      updatedAt: new Date().toLocaleString()
    };

    if (editingIndex !== null) {
      products[editingIndex] = product;
    } else {
      products.push(product);
    }

    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
    closeModal();
  }

  // ===== GLOBALES =====
  window.editProduct = (index) => {
    const p = products[index];
    nameInput.value = p.name;
    brandInput.value = p.brand;
    sizeInput.value = p.size;
    buyPriceInput.value = p.buyPrice;
    sellPriceInput.value = p.sellPrice;
    detailInput.value = p.detail;
    editingIndex = index;
    openModal();
  };

  window.deleteProduct = (index) => {
    if (!confirm("¿Eliminar producto?")) return;
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
  };

  // ===== EVENTOS =====
  addBtn.addEventListener("click", openModal);
  cancelBtn.addEventListener("click", closeModal);
  saveBtn.addEventListener("click", saveProduct);

  searchInput.addEventListener("input", () => {
    const text = searchInput.value.toLowerCase();
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(text) ||
      p.brand.toLowerCase().includes(text)
    );
    renderProducts(filtered);
  });

  renderProducts();
});
