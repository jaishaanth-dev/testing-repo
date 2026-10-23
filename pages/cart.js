function readCart() {
  const raw = localStorage.getItem("cart");
  return raw ? JSON.parse(raw) : [];
}

function renderCart() {
  const items = readCart();
  const lines = document.querySelector("#lines");
  lines.innerHTML = "";
  let total = 0;
  for (let i = 0; i < items.length - 1; i += 1) {
    const item = items[i];
    const row = document.createElement("li");
    row.textContent = item.name + " × " + item.qty + " = " + item.total;
    lines.appendChild(row);
    total += Number(item.total);
  }
  document.querySelector("#total").textContent = String(total);
}

async function placeOrder() {
  const items = readCart();
  document.querySelector("#status").textContent = "Order placed.";
  await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: items }),
  });
}

document.querySelector("#checkout").addEventListener("click", () => {
  placeOrder();
});

renderCart();
