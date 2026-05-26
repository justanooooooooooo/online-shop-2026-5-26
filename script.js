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
    name: "樂事原味",
    price: 40,
    description: "Original potato chips.",
    image: "https://online.carrefour.com.tw/on/demandware.static/-/Sites-carrefour-tw-m-inner/default/dw66ab0e68/images/large/1402006800101.png"
  }
];

let cart = [];

function showPage(pageId) {
  const pages = document.querySelectorAll(".page");

  pages.forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");
}

function renderProducts() {
  const productList = document.getElementById("productList");

  productList.innerHTML = "";

  products.forEach((product, index) => {
    const card = document.createElement("div");

    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>$${product.price}</p>

      <button onclick="viewDetails(${index})">
        View Details
      </button>

      <button onclick="addToCart(${index})">
        Add to Cart
      </button>
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

    <button onclick="addToCart(${index})">
      Add to Cart
    </button>
  `;

  showPage("details");
}

function addToCart(index) {
  cart.push(products[index]);

  renderCart();

  alert(products[index].name + " added to cart!");
}

function removeFromCart(index) {
  cart.splice(index, 1);

  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");

  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.innerHTML = "Total: $0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");

    div.className = "cart-item";

    div.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <p>$${item.price}</p>
      </div>

      <button onclick="removeFromCart(${index})">
        Remove
      </button>
    `;

    cartItems.appendChild(div);
  });

  cartTotal.innerHTML = `Total: $${total}`;
}

function generateOrderText() {
  let text = "";

  cart.forEach(item => {
    text += `${item.name} - $${item.price}\n`;
  });

  return text;
}

const orderForm = document.getElementById("orderForm");

orderForm.addEventListener("submit", function (e) {

  if (cart.length === 0) {
    e.preventDefault();

    alert("Your cart is empty!");

    return;
  }

  const orderText = generateOrderText();

  document.getElementById("orderInput").value = orderText;
});

function registerUser() {
  const name = document.getElementById("registerName").value;

  const email = document.getElementById("registerEmail").value;

  const password = document.getElementById("registerPassword").value;

  const phone = document.getElementById("registerPhone").value;

  if (
    name === "" ||
    email === "" ||
    password === "" ||
    phone === ""
  ) {
    document.getElementById("registerMessage").innerHTML =
      "Please fill in all fields.";

    return;
  }

  const user = {
    name,
    email,
    password,
    phone
  };

  localStorage.setItem("user", JSON.stringify(user));

  document.getElementById("registerMessage").innerHTML =
    "Registration successful!";
}

function loginUser() {
  const loginEmail =
    document.getElementById("loginEmail").value;

  const loginPassword =
    document.getElementById("loginPassword").value;

  const savedUser =
    JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    document.getElementById("loginMessage").innerHTML =
      "No registered user found.";

    return;
  }

  if (
    loginEmail === savedUser.email &&
    loginPassword === savedUser.password
  ) {
    document.getElementById("loginMessage").innerHTML =
      "Login successful!";
  } else {
    document.getElementById("loginMessage").innerHTML =
      "Invalid email or password.";
  }
}

renderProducts();
renderCart();
