window.addEventListener("DOMContentLoaded", displayProducts);

function displayProducts() {
  const productContainer = document.getElementById("product-container");
  const productCards = productContainer.getElementsByClassName("product-card");

  Array.from(productCards).forEach((productCard) => {
    const productNameElement = productCard.getElementsByClassName("product-name")[0];
    const productPriceElement = productCard.getElementsByClassName("product-price")[0];

    const addToCartButton = document.createElement("button");
    addToCartButton.className = "add-to-cart";
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.onclick = function () {
      addToCart(productNameElement.textContent, parseFloat(productPriceElement.textContent.replace("$", "")));
    };

    productCard.appendChild(addToCartButton);
  });

  productContainer.style.display = "flex";
  productContainer.style.flexWrap = "wrap";
  productContainer.style.justifyContent = "space-around";
}
