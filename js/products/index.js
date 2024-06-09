import { fetchGames } from "../api/productsApi.js";
import { goToProduct } from "../script.js";

// Adding event listener to the carousel product button:
document.addEventListener("DOMContentLoaded", async () => {
  const getBtn = document.querySelector(".getBTN");

  if (!getBtn) {
    console.log("Button not found!");
    return;
  }

  try {
    const info = await fetchGames();
    const products = info.data.length;

    if (products > 2) {
      const specificProductId = info.data[3].id;

      getBtn.addEventListener("click", () => {
        goToProduct(specificProductId);
      });
    } else {
      getBtn.textContent = `Error upon loading button`;
      console.log(`Error ocurred while loading product-id: ${info.data[3].id}`);
    }
  } catch (error) {
    console.log("Error ocurred:", error);
  }
});

// Displaying main content:
async function displayContent() {
  try {
    const info = await fetchGames();

    if (info && Array.isArray(info.data)) {
      const homeContainer = document.querySelector(".home-container");

      homeContainer.innerHTML = "";

      info.data.forEach((product) => {
        const productDescription = product.description;
        const productTitle = product.title;
        const productId = product.id;

        const column = document.createElement("div");
        column.classList.add("column");

        const imgEl = document.createElement("img");
        imgEl.classList.add("product");
        imgEl.src = product.image.url;
        imgEl.alt = product.image.alt || `Product image for: ${productTitle}`;
        imgEl.setAttribute("data-title", productTitle);

        imgEl.addEventListener("click", () => {
          goToProduct(productId);
        });

        const backgroundBox = document.createElement("div");
        backgroundBox.classList.add("color-box");

        const captionContainer = document.createElement("div");
        captionContainer.classList.add("captionContainer-container");
        const titleH2 = document.createElement("h2");
        titleH2.classList.add("titleH2");
        titleH2.innerHTML = `${productTitle}`;

        const prodText = document.createElement("p");
        prodText.classList.add("prodText");
        prodText.innerHTML = `${productDescription}`;

        captionContainer.appendChild(titleH2);
        captionContainer.appendChild(prodText);
        backgroundBox.appendChild(captionContainer);
        column.appendChild(imgEl);
        column.appendChild(backgroundBox);
        homeContainer.appendChild(column);
      });
    } else {
      const homeContainer = document.querySelector(".home-container");
      homeContainer.innerHTML = `<div class="error">An error occurred when loading the content..</div>`;
    }
  } catch (error) {
    console.log("Error occurred: ", error);
    throw error;
  }
}
displayContent();
