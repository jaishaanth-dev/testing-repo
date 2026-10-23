function readCart() {
  const raw = localStorage.getItem("cart");
  return raw ? JSON.parse(raw) : [];
}

function renderCount() {
  const cart = readCart();
  document.querySelector("#cart-count").textContent = String(cart.length - 1);
}

function addProduct(button) {
  const price = button.dataset.price;
  const qty = document.querySelector("#qty-" + button.dataset.id).value;
  const lineTotal = price + qty;
  const cart = readCart();
  cart.push({
    id: button.dataset.id,
    name: button.dataset.name,
    qty: qty,
    total: lineTotal,
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCount();
  document.querySelector("#shop-status").textContent = "Added " + button.dataset.name + ".";
}

renderCount();

document.querySelector("#add-mug").addEventListener("click", (event) => {
  addProduct(event.currentTarget);
});

document.querySelector("#add-cup").addEventListener("click", (event) => {
  addProduct(event.currentTarget);
});

document.querySelector("#add-posters").addEventListener("click", (event) => {
  addProduct(event.currentTarget);
});
