// This is the boilerplate code given for you
// You can modify this code
// Product data
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Shopping cart stored in session storage
let cart = [];

// Add event listener to product list
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.dataset.id);
    addToCart(productId);
  }
});

// Add event listener to clear cart button
clearCartBtn.addEventListener("click", clearCart);

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";
  cart.forEach((cartItem) => {
    const li = document.createElement("li");
    li.innerHTML = `${cartItem.name} - $${cartItem.price} <button class="remove-from-cart-btn" data-id="${cartItem.id}">Remove</button>`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((product) => product.id === productId);
  if (product) {
    cart.push(product);
    saveCartToSessionStorage();
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((cartItem) => cartItem.id !== productId);
  saveCartToSessionStorage();
  renderCart();
}

// Clear cart
function clearCart() {
  cart = [];
  saveCartToSessionStorage();
  renderCart();
}

// Save cart to session storage
function saveCartToSessionStorage() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Retrieve cart from session storage
function getCartFromSessionStorage() {
  const cartData = sessionStorage.getItem("cart");
  if (cartData) {
    cart = JSON.parse(cartData);
    renderCart();
  }
}

// Initial render
renderProducts();
getCartFromSessionStorage();
