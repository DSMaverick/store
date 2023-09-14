// Theme
window.addEventListener("load", handlePageLoad);

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  body.classList.add(savedTheme);
}

themeToggle.addEventListener("click", function () {
  body.classList.toggle("dark-theme");

  if (body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark-theme");
  } else {
    localStorage.setItem("theme", "");
  }
});

let isThemeActive = localStorage.getItem("themeActive") === "true";

updateTheme(isThemeActive);

document.getElementById("theme-toggle").addEventListener("click", () => {
  isThemeActive = !isThemeActive;
  updateTheme(isThemeActive);
  localStorage.setItem("themeActive", isThemeActive);
});

function updateTheme(active) {
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.classList.toggle("active", active);
  document.body.classList.toggle("dark-theme", active);
}

// Cart
function handlePageLoad() {
  const currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "cart.html") {
    showCartItems();
  }
}

function addToCart(productName, price) {
  let cartItems = localStorage.getItem("cartItems");
  if (cartItems) {
    cartItems = JSON.parse(cartItems);
  } else {
    cartItems = [];
  }

  const existingCartItem = cartItems.find(
    (item) => item.productName === productName
  );
  if (existingCartItem) {
    existingCartItem.quantity++;
  } else {
    cartItems.push({ productName, price, quantity: 1 });
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function removeFromCart(productName) {
  let cartItems = localStorage.getItem("cartItems");
  if (cartItems) {
    cartItems = JSON.parse(cartItems);

    const itemIndex = cartItems.findIndex(
      (item) => item.productName === productName
    );
    if (itemIndex !== -1) {
      const item = cartItems[itemIndex];
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cartItems.splice(itemIndex, 1);
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }

  showCartItems();
}

function showCartItems() {
  const cartItems = localStorage.getItem("cartItems");
  const cartItemsElement = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  if (cartItems) {
    const items = JSON.parse(cartItems);
    let cartHtml = "";
    let totalPrice = 0;

    for (const element of items) {
      const item = element;
      cartHtml += `<li>${item.productName} - $${item.price} x ${
        item.quantity
      } = $${(item.price * item.quantity).toFixed(2)}`;
      const buttonStyle = `background-color: #4CAF50;
        border: none;
        color: white;
        padding: 8px 16px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        transition-duration: 0.4s;
        cursor: pointer;
        border-radius: 4px;
        margin-left: 10px;`;
      cartHtml += `<button onclick="removeFromCart('${item.productName}')" style="${buttonStyle}">Remove</button></li>`;
      totalPrice += item.price * item.quantity;
    }

    cartItemsElement.innerHTML = cartHtml;
    totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
  } else {
    cartItemsElement.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceElement.textContent = "";
  }
}

// Filtru
function filterByPrice(option) {
  const productContainer = document.getElementById("product-container");
  const productCards = document.getElementsByClassName("product-card");

  const productList = Array.from(productCards);
  const sortedList = productList.sort(function (a, b) {
    const priceA = parseFloat(
      a.querySelector(".product-price").textContent.replace("$", "")
    );
    const priceB = parseFloat(
      b.querySelector(".product-price").textContent.replace("$", "")
    );

    if (option === "low") {
      return priceA - priceB;
    } else if (option === "high") {
      return priceB - priceA;
    }
  });

  while (productContainer.firstChild) {
    productContainer.removeChild(productContainer.firstChild);
  }

  sortedList.forEach(function (card) {
    productContainer.appendChild(card);
  });
}

// Drag and drop
document.addEventListener("DOMContentLoaded", () => {
  const draggableItems = document.querySelectorAll(".draggable");
  let draggedItem = null;

  draggableItems.forEach((item) => {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", drop);
  });

  function dragStart(event) {
    draggedItem = this;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", this.innerHTML);
  }

  function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function drop(event) {
    event.preventDefault();
    const targetItem = this;
    const parent = targetItem.parentNode;

    if (draggedItem !== targetItem) {
      const targetIndex = Array.from(parent.children).indexOf(targetItem);
      const draggedIndex = Array.from(parent.children).indexOf(draggedItem);

      if (targetIndex < draggedIndex) {
        parent.insertBefore(draggedItem, targetItem);
      } else {
        parent.insertBefore(draggedItem, targetItem.nextSibling);
      }

      saveMenuOrder(parent.children);
    }
  }

  function saveMenuOrder(menuItems) {
    const menuOrder = Array.from(menuItems).map((item) => item.innerHTML);
    localStorage.setItem("menuOrder", JSON.stringify(menuOrder));
  }

  function loadMenuOrder() {
    const menuOrder = JSON.parse(localStorage.getItem("menuOrder"));

    if (menuOrder) {
      const draggableNav = document.getElementById("draggable-nav");

      menuOrder.forEach((item) => {
        const existingItem = Array.from(draggableNav.children).find(
          (child) => child.innerHTML === item
        );
        if (existingItem) {
          draggableNav.appendChild(existingItem);
        } else {
          const li = document.createElement("li");
          li.className = "draggable";
          li.draggable = true;
          li.innerHTML = item;
          draggableNav.appendChild(li);
        }
      });

      saveMenuOrder(draggableNav.children);
    }
  }

  loadMenuOrder();
});
