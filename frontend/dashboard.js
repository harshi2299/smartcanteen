// Check if user is logged in
const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user) {
  // If not logged in, redirect to login page
  alert("Please login first!");
  window.location.href = "login.html";
}

// Display welcome message
document.getElementById("welcomeUser").innerText = "Welcome, `${user.fullName}` || `${user.username}`!";

// Menu items (static)
const menu = [
  { id: 1, name: "Masala Dosa", price: 30 },
  { id: 2, name: "Idli Vada", price: 25 },
  { id: 3, name: "Veg Pulao", price: 40 },
  { id: 4, name: "Chai", price: 10 }
];

let cart = [];

const menuList = document.getElementById("menuList");
menu.forEach(item => {
  const div = document.createElement("div");
  div.innerHTML = `
    <strong>${item.name}</strong> - ₹${item.price}
    <input type="number" id="qty-${item.id}" min="1" max="10" value="1" />
    <button onclick="addToCart(${item.id})">Add</button>
  `;
  menuList.appendChild(div);
});

function addToCart(id) {
  const item = menu.find(m => m.id === id);
  const qty = parseInt(document.getElementById(qty-`${id}`).value);
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...item, qty });
  }
  updateCart();
}

function updateCart() {
  const cartDiv = document.getElementById("cartItems");
  const total = document.getElementById("totalPrice");
  cartDiv.innerHTML = "";
  let sum = 0;

  cart.forEach(item => {
    const itemTotal = item.qty * item.price;
    sum += itemTotal;
    cartDiv.innerHTML += "<p>`${item.name} `x` ${item.qty}` = ₹`${itemTotal}`</p>";
  });

  total.innerText = "Total: ₹`${sum}`";
}

function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    alert("You are not logged in!");
    window.location.href = "login.html";
    return;
  }

  const total = cart.reduce((sum, item) => sum + (item.qty * item.price), 0);

  // Build order object
  const newOrder = {
    username: user.username,
    items: cart,
    total,
    status: "Pending",
    timestamp: new Date().toISOString()
  };

  // Load existing orders
  const existingOrders = JSON.parse(localStorage.getItem("canteenOrders")) || [];

  // Save new order
  existingOrders.push(newOrder);
  localStorage.setItem("canteenOrders", JSON.stringify(existingOrders));

  alert("Order placed successfully!");
  cart = [];
  updateCart();
}

function viewMyOrders() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const orders = JSON.parse(localStorage.getItem("canteenOrders")) || [];
  const myOrders = orders.filter(order => order.username === user.username);
  const display = document.getElementById("myOrders");

  if (myOrders.length === 0) {
    display.innerHTML = "<p>No previous orders found.</p>";
    return;
  }

  display.innerHTML = "<h4>Previous Orders:</h4>";
  myOrders.reverse().forEach(order => {
    const items = order.items.map(i => ${i.name} x ${i.qty}).join(", ");
    display.innerHTML += <p>${items} - ₹${order.total} - ${order.status}</p>;
  });
}