import { fetchProducts } from "./utils.js";

const selectors = {
  getProductsContainer() {
    return document.querySelector(".mainbody__products-container");
  },
};

const initialState = {
  products: [],
};

function stateControl() {
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
      const productH4 = document.createElement("h4");
      productH4.innerText = product.colour;
      const productDesc = document.createElement("p");
      productDesc.innerText = product.desc;

      const shopBtnContainer = document.createElement("div");
      shopBtnContainer.classList.add("shop-btn");
      const productButtonContainer = document.createElement("div");
      productButtonContainer.classList.add("btn");
      productButtonContainer.classList.add("product-btn");

      const productLink = document.createElement("a");
      productLink.href = "#";
      productLink.role = `shop ${product.name}`;
      productLink.innerText = `shop ${product.name}`;

      productButtonContainer.appendChild(productLink);
      shopBtnContainer.appendChild(productButtonContainer);

      productTextContainer.append(productH2, productH4, productDesc);

      imageContainer.append(image, productTextContainer);
      productContainer.append(imageContainer, shopBtnContainer);

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

  const state = stateControl();
  state.initializeState(products);

  const renderer = Renderer();
  renderer.renderProducts(state.getState());
}

runVanilla();
