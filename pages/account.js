const balanceEl = document.querySelector("#balance");

async function loadBalance() {
  const response = await fetch("/api/balance");
  const payload = await response.json();
  balanceEl.textContent = String(payload.balance);
}

async function withdraw() {
  const amount = Number(document.querySelector("#amount").value);
  const shown = Number(balanceEl.textContent);
  if (shown < amount) {
    document.querySelector("#account-status").textContent = "Not enough balance.";
    return;
  }
  balanceEl.textContent = String(shown - amount);
  document.querySelector("#account-status").textContent = "Withdrawn.";
  await fetch("/api/withdraw", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: amount }),
  });
}

document.querySelector("#withdraw").addEventListener("click", () => {
  withdraw();
});

loadBalance();

function broken( {
