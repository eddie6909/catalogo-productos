const list = document.getElementById('productList');
const modal = document.getElementById('modal');
const addBtn = document.getElementById('addBtn');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');
const searchInput = document.getElementById('searchInput');

// CAMPOS (ESTO ES LO QUE FALTABA)
const productName = document.getElementById('productName');
const brand = document.getElementById('brand');
const size = document.getElementById('size');
const buyPrice = document.getElementById('buyPrice');
const sellPrice = document.getElementById('sellPrice');
const detail = document.getElementById('detail');

let editIndex = null;

function openModal() {
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  productName.value = '';
  brand.value = '';
  size.value = '';
  buyPrice.value = '';
  sellPrice.value = '';
  detail.value = '';
  editIndex = null;
}

addBtn.addEventListener('click', openModal);
cancelBtn.addEventListener('click', closeModal);

saveBtn.addEventListener('click', () => {
  if (!productName.value.trim()) return;

  const product = {
    name: productName.value,
    brand: brand.value,
    size: size.value,
    buy: buyPrice.value,
    sell: sellPrice.value,
    detail: detail.value,
    date: new Date().toLocaleDateString()
  };

  const products = getProducts();

  if (editIndex !== null) {
    products[editIndex] = product;
  } else {
    products.push(product);
  }

  saveProducts(products);
  render(products);
  closeModal();
});

function render(products) {
  list.innerHTML = '';
  products.forEach((p, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${p.name}</strong><br>
      ${p.brand} | ${p.size}<br>
      Compra: ${p.buy} | Venta: ${p.sell}<br>
      <small>${p.detail}</small><br>
      <small>${p.date}</small>
      <div>
        <button onclick="edit(${i})">Editar</button>
        <button onclick="del(${i})">Eliminar</button>
      </div>
    `;
    list.appendChild(li);
  });
}

window.edit = function (i) {
  const p = getProducts()[i];
  productName.value = p.name;
  brand.value = p.brand;
  size.value = p.size;
  buyPrice.value = p.buy;
  sellPrice.value = p.sell;
  detail.value = p.detail;
  editIndex = i;
  openModal();
};

window.del = function (i) {
  const products = getProducts();
  products.splice(i, 1);
  saveProducts(products);
  render(products);
};

searchInput.addEventListener('input', () => {
  const text = searchInput.value.toLowerCase();
  const filtered = getProducts().filter(p =>
    p.name.toLowerCase().includes(text)
  );
  render(filtered);
});

closeModal();
render(getProducts());

