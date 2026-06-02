const products = [
  {
    name: "麥香紅茶",
    price: 15,
    description: "Classic black tea drink.",
    image: "https://web.hocom.tw/Uploads/Product/148624_483501185433.jpg"
  },
  {
    name: "麥香綠茶",
    price: 15,
    description: "Refreshing green tea.",
    image: "https://web.hocom.tw/Uploads/Product/s/25003/148630_374577231671.jpg"
  },
  {
    name: "麥香奶茶",
    price: 15,
    description: "Sweet milk tea drink.",
    image: "https://web.hocom.tw/Uploads/Product/s/25003/148632_742701449649.jpg"
  },
  {
    name: "RED BULL",
    price: 70,
    description: "Energy drink.",
    image: "https://via.placeholder.com/300x200?text=RED+BULL"
  },
  {
    name: "特上紅茶",
    price: 35,
    description: "Premium black tea.",
    image: "https://img.yec.tw/zp/MerchandiseImages/de9855922d-Gd-5169846.jpg"
  },
  {
    name: "滿漢大餐蔥燒牛肉麵",
    price: 40,
    description: "Instant beef noodles.",
    image: "https://cs-a.ecimg.tw/items/DBAY10A900HSAQB/001001_1725516647.jpg"
  },
  {
    name: "來一客鮮蝦魚板",
    price: 40,
    description: "Shrimp instant noodles.",
    image: "https://shoptaiwan.us/cdn/shop/products/image_8af03874-7bfc-4751-9a3a-236e35615d3b_512x512.jpg?v=1661241883"
  },
  {
    name: "來一客牛肉蔬菜",
    price: 40,
    description: "Beef and vegetable instant noodles.",
    image: "https://mall.iopenmall.tw/website/uploads_product/website_9920/P0992005735027_3_48745670.jpeg?hash=50348"
  },
  {
    name: "來一客韓式泡菜",
    price: 40,
    description: "Korean kimchi flavor instant noodles.",
    image: "https://shoptaiwan.us/cdn/shop/products/image_b5427701-c7b8-42bd-b4f1-95468500f188_600x600.jpg?v=1661241898"
  },
  {
    name: "來一客川辣牛肉",
    price: 40,
    description: "Spicy beef instant noodles.",
    image: "https://online.carrefour.com.tw/on/demandware.static/-/Sites-carrefour-tw-m-inner/default/dw73f69a96/images/large/1450104500124_NR_00.png"
  },
  {
    name: "大乾麵蔥燒牛肉",
    price: 40,
    description: "Dry beef noodles.",
    image: "https://eatfoodgod.com/wp-content/uploads/2024/05/c-22.webp"
  },
  {
    name: "樂事原味",
    price: 40,
    description: "Original potato chips.",
    image: "https://online.carrefour.com.tw/on/demandware.static/-/Sites-carrefour-tw-m-inner/default/dw66ab0e68/images/large/1402006800101.png"
  },
  {
    name: "卡拉姆久",
    price: 40,
    description: "Spicy snack chips.",
    image: "https://b2eimg.pxec.com.tw/00154559/827eedb36bbe48b2aa15fe38f4c01194.jpg"
  }
];

let cart = [];

function showPage(pageId) {
  const pages = document.querySelectorAll(".page");

  pages.forEach(function (page) {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");
}

function renderProducts() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  products.forEach(function (product, index) {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p><strong>$${product.price}</strong></p>

      <button onclick="viewDetails(${index})">View Details</button>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;

    productList.appendChild(card);
  });
}

function viewDetails(index) {
  const product = products[index];
  const details = document.getElementById("productDetails");

  details.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h1>${product.name}</h1>
    <p>${product.description}</p>
    <p><strong>Price:</strong> $${product.price}</p>
    <button onclick="addToCart(${index})">Add to Cart</button>
    <button onclick="showPage('products')">Back to Products</button>
  `;

  showPage("details");
}

function addToCart(index) {
  const product = products[index];

  const existingItem = cart.find(function (item) {
    return item.name === product.name;
  });

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }

  renderCart();
  alert(product.name + " added to cart!");
}

function increaseQuantity(index) {
  cart[index].quantity += 1;
  renderCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }

  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.innerHTML = "Total: $0";
    return;
  }

  let total = 0;

  cart.forEach(function (item, index) {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <p>Price: $${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Item Total: $${itemTotal}</p>
      </div>

      <div>
        <button onclick="decreaseQuantity(${index})">-</button>
        <button onclick="increaseQuantity(${index})">+</button>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;

    cartItems.appendChild(div);
  });

  cartTotal.innerHTML = `Total: $${total}`;
}

function generateOrderText() {
  let text = "Order Details:\n\n";
  let total = 0;

  cart.forEach(function (item) {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    text += `${item.name} | Price: $${item.price} | Quantity: ${item.quantity} | Item Total: $${itemTotal}\n`;
  });

  text += `\nTotal Cost: $${total}`;

  return text;
}

const orderForm = document.getElementById("orderForm");

orderForm.addEventListener("submit", function (e) {
  if (cart.length === 0) {
    e.preventDefault();
    alert("Your cart is empty!");
    return;
  }

  document.getElementById("orderInput").value = generateOrderText();
});

function registerUser() {
  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();
  const phone = document.getElementById("registerPhone").value.trim();

  if (name === "" || email === "" || password === "" || phone === "") {
    document.getElementById("registerMessage").innerHTML =
      "Please fill in all fields.";
    return;
  }

  const user = {
    name: name,
    email: email,
    password: password,
    phone: phone
  };

  localStorage.setItem("user", JSON.stringify(user));

  document.getElementById("registerMessage").innerHTML =
    "Registration successful! You can now login.";
}

function loginUser() {
  const loginEmail = document.getElementById("loginEmail").value.trim();
  const loginPassword = document.getElementById("loginPassword").value.trim();

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    document.getElementById("loginMessage").innerHTML =
      "No registered user found. Please register first.";
    return;
  }

  if (
    loginEmail === savedUser.email &&
    loginPassword === savedUser.password
  ) {
    document.getElementById("loginMessage").innerHTML =
      "Login successful! Welcome, " + savedUser.name + ".";
  } else {
    document.getElementById("loginMessage").innerHTML =
      "Invalid email or password.";
  }
}

renderProducts();
renderCart();
