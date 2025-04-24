// Sample menu
let menu = JSON.parse(localStorage.getItem("canteenMenu")) || [
  { id: 1, name: "Masala Dosa", price: 30 },
  { id: 2, name: "Idli Vada", price: 25 },
  { id: 3, name: "Veg Pulao", price: 40 }
];

// Sample orders (in real project, fetch from backend)
let orders = JSON.parse(localStorage.getItem("canteenOrders")) || [];

// Load Orders
function loadOrders() {
  const tbody = document.querySelector("#orderTable tbody");
  tbody.innerHTML = "";

  orders.forEach((order, index) => {
    const tr = document.createElement("tr");

    const itemsHTML = order.items.map(item => ${item.name} x ${item.qty}).join("<br>");

    tr.innerHTML = `
      <td>${order.username}</td>
      <td>${itemsHTML}</td>
      <td>₹${order.total}</td>
      <td>${order.status}</td>
      <td>
        <select onchange="updateStatus(${index}, this.value)">
          <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>
          <option value="Preparing" ${order.status === "Preparing" ? "selected" : ""}>Preparing</option>
          <option value="Ready" ${order.status === "Ready" ? "selected" : ""}>Ready</option>
          <option value="Delivered" ${order.status === "Delivered" ? "selected" : ""}>Delivered</option>
        </select>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function updateStatus(index, newStatus) {
  orders[index].status = newStatus;
  localStorage.setItem("canteenOrders", JSON.stringify(orders));
  loadOrders();
}

// Load Menu
function loadMenu() {
  const tbody = document.querySelector("#menuTable tbody");
  tbody.innerHTML = "";

  menu.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>₹${item.price}</td>
      <td><button class="btn" onclick="deleteMenuItem(${index})">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function addMenuItem() {
  const name = document.getElementById("newItemName").value.trim();
  const price = parseInt(document.getElementById("newItemPrice").value);

  if (!name || isNaN(price)) {
    alert("Please enter valid name and price.");
    return;
  }

  menu.push({ id: Date.now(), name, price });
  localStorage.setItem("canteenMenu", JSON.stringify(menu));
  loadMenu();

  document.getElementById("newItemName").value = "";
  document.getElementById("newItemPrice").value = "";
}

function deleteMenuItem(index) {
  menu.splice(index, 1);
  localStorage.setItem("canteenMenu", JSON.stringify(menu));
  loadMenu();
}

// Init
loadOrders();
loadMenu();