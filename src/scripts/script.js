import { fetchProducts } from "./utils.js";

const selectors = {
  getProductsContainer() {
    return document.querySelector(".mainbody__products-container");
  },
};

const initialState = {
  products: [],
};

function stateManager() {
  let state = initialState;
  function initializeState() {
    state = {
      ...state,
      products: fetchProducts(),
    };
  }
  function getState() {
    return state;
  }
  return {
    initializeState,
    getState,
  };
}

function Renderer() {
  function renderProducts(state) {
    const mainBodyProductsContainer = selectors.getProductsContainer();

    if (!mainBodyProductsContainer.firstChild) {
      removeProducts();
    }

    state.products.forEach((product) => {
      const productContainer = document.createElement("div");
      productContainer.classList.add("mainbody__product-item");

      const imageContainer = document.createElement("div");
      imageContainer.classList.add("product-img");

      const image = document.createElement("img");
      image.src = product.image;
      image.alt = product.name;
      const productTextContainer = document.createElement("div");
      productTextContainer.classList.add("product-text");

      const productH2 = document.createElement("h2");
      productH2.innerText = product.name;

      const productH3 = document.createElement("h3");

      productH3.innerText = product.colour;
      const productDesc = document.createElement("p");
      productDesc.innerText = product.desc;

      const productLink = document.createElement("a");
      productLink.classList.add("btn");
      productLink.classList.add("product-btn");
      productLink.href = "#";
      productLink.role = `shop ${product.name}`;
      productLink.innerText = `shop ${product.name}`;

      productTextContainer.append(productH2, productH3, productDesc);

      imageContainer.append(image, productTextContainer);
      productContainer.append(imageContainer, productLink);

      mainBodyProductsContainer.appendChild(productContainer);
    });
  }

  function removeProducts() {
    const productsContainer = selectors.getProductsContainer();
    while (productsContainer.firstChild) {
      productsContainer.firstChild.remove();
    }
  }
  return {
    renderProducts,
    removeProducts,
  };
}

function runVanilla() {
  const products = fetchProducts();

  const state = stateManager();
  state.initializeState(products);

  const renderer = Renderer();
  renderer.renderProducts(state.getState());
}

runVanilla();
