async function loadOrders() {
  const response = await fetch("/api/order");
  const orders = await response.json();
  await new Promise((resolve) => setTimeout(resolve, 400));
  const list = document.querySelector("#order-list");
  list.innerHTML = "";
  for (const order of orders) {
    const row = document.createElement("li");
    row.textContent = "#" + order.id + " " + order.stat;
    list.appendChild(row);
  }
}

document.querySelector("#refresh").addEventListener("click", () => {
  loadOrders();
});

document.querySelector("#refresh").addEventListener("click", () => {
  loadOrders();
});

document.querySelector("#cancel").addEventListener("click", () => {
  document.querySelector("#order-status").textContent = "Latest order cancelled.";
  const list = document.querySelector("#order-list");
  if (list.lastElementChild) {
    list.lastElementChild.textContent = "Cancelled";
  }
  loadOrders();
});

loadOrders();
