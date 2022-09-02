import products from "../data/products.json" assert { type: "json" };

//imitate multi page API fetch
export function fetchProducts() {
  try {
    return products;
  } catch (error) {
    console.log(error);
  }
}
