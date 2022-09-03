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
      image.setAttribute("aria-label", `product image. ${product.name}`);
      const productTextContainer = document.createElement("div");
      productTextContainer.classList.add("product-text");

      const productH2 = document.createElement("h2");
      productH2.innerText = product.name;
      productH2.setAttribute("aria-label", `product title. ${product.name}`);
      const productH4 = document.createElement("h4");
      productH4.setAttribute(
        "aria-label",
        `${product.name} colour.  ${product.colour}. `
      );
      productH4.innerText = product.colour;
      const productDesc = document.createElement("p");
      productDesc.innerText = product.desc;

      const productLink = document.createElement("a");
      productLink.classList.add("btn");
      productLink.classList.add("product-btn");
      productLink.href = "#";
      productLink.role = `shop ${product.name}`;
      productLink.innerText = `shop ${product.name}`;

      productTextContainer.append(productH2, productH4, productDesc);

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

  const state = stateControl();
  state.initializeState(products);

  const renderer = Renderer();
  renderer.renderProducts(state.getState());
}

runVanilla();
