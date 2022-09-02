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
    console.log(mainBodyProductsContainer);
    if (!mainBodyProductsContainer.firstChild) {
      removeProducts();
    }

    state.products.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.classList.add("mainbody__product-item");

      const productImgContainer = document.createElement("div");
      productImgContainer.classList.add("product-img");

      const productImage = document.createElement("img");
      productImage.src = product.image;
      productImage.alt = product.type;

      const productDetailsWarpper = document.createElement("div");
      productDetailsWarpper.classList.add("product-details-wrapper");

      const productDetails = document.createElement("div");
      productDetails.classList.add("product-details");

      const productHeader = document.createElement("h2");
      productHeader.innerText = product.name;

      const productColour = document.createElement("h4");
      productColour.innerText = product.colour;

      const productDescContiner = document.createElement("div");
      productDescContiner.classList.add("product-desc");

      const productText = document.createElement("p");
      productText.innerText = product.desc;

      const button = document.createElement("a");
      button.href = "#";
      button.role = `shop ${product.name}`;
      button.innerText = `shop ${product.name}`;
      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("btn");
      buttonContainer.classList.add("product-btn");

      buttonContainer.appendChild(button);

      productImgContainer.appendChild(productImage);
      productDescContiner.appendChild(productText);
      productDetails.append(productHeader, productColour, productDescContiner);

      productDetailsWarpper.append(productDetails, buttonContainer);
      productItem.append(productImgContainer, productDetailsWarpper);

      mainBodyProductsContainer.appendChild(productItem);
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
