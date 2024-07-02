import { Router } from "express";
import cartDao from "../dao/MongoDB/cart.dao.js";
import productDao from "../dao/MongoDB/product.dao.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const cart = await cartDao.create();

    res.status(201).json({ status: "success", cart });
  } catch (error) {
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartDao.getById(cid);
    if (!cart)
      return res.status(404).json({ status: "Error", msg: "Cart not found" });

    res.status(200).json({ status: "success", cart });
  } catch (error) {
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const product = await productDao.getById(pid);
    if (!product)
      return res
        .status(404)
        .json({ status: "Error", msg: "Product not found" });

    const cart = await cartDao.addProductToCart(cid, product);
    if (!cart)
      return res.status(404).json({ status: "Error", msg: "Cart not found" });

    res.status(200).json({ status: "success", cart });
  } catch (error) {
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

export default router;
