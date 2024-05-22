import fs from "fs";

let carts = [];
const pathFile = "./src/data/carts.json";

const getCarts = async () => {
  const cartsJson = await fs.promises.readFile(pathFile, "utf-8");
  const cartsPars = JSON.parse(cartsJson);
  carts = cartsPars || [];
};

const createCart = async () => {
  await getCarts();
  const newCart = {
    id: carts.length + 1,
    products: [],
  };

  carts.push(newCart);

  await fs.promises.writeFile(pathFile, JSON.stringify(carts));
  return newCart;
};

const getCartById = async (cid) => {
  await getCarts();
  const cart = carts.find((c) => c.id === cid);
  return cart;
};

const addProductToCart = async (cid, pid) => {
  await getCarts();
  const index = carts.findIndex((cart) => cart.id === cid);
  const cart = carts[index];

  const productIndex = cart.product.findIndex((product) => product.product.id);

  if (productIndex !== -1) {
    cart.products[productIndex].quantity += 1;
  } else {
    const product = {
      product: pid,
      quantity: 1,
    };
  }

  carts.products.push(product);

  await fs.promises.writeFile(pathFile, JSON.stringify(carts));

  return cart;
};

export default {
  getCarts,
  getCartById,
  addProductToCart,
  createCart,
};
