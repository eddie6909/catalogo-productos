const list = document.getElementById('productList');
const modal = document.getElementById('modal');
const addBtn = document.getElementById('addBtn');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');
const searchInput = document.getElementById('searchInput');

let editIndex = null;

function openModal() {
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  document.querySelectorAll('.modal-content input, textarea')
    .forEach(e => e.value = '');
  editIndex = null;
}

addBtn.onclick = openModal;
cancelBtn.onclick = closeModal;

saveBtn.onclick = () => {
  const product = {
    name: name.value,
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
};

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
      <div class="actions">
        <button onclick="edit(${i})">Editar</button>
        <button onclick="del(${i})">Eliminar</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function edit(i) {
  const p = getProducts()[i];
  name.value = p.name;
  brand.value = p.brand;
  size.value = p.size;
  buyPrice.value = p.buy;
  sellPrice.value = p.sell;
  detail.value = p.detail;
  editIndex = i;
  openModal();
}

function del(i) {
  const products = getProducts();
  products.splice(i, 1);
  saveProducts(products);
  render(products);
}

searchInput.oninput = () => {
  const text = searchInput.value.toLowerCase();
  const products = getProducts().filter(p =>
    p.name.toLowerCase().includes(text)
  );
  render(products);
};

render(getProducts());

