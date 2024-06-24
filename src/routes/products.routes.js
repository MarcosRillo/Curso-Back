import { Router } from "express";
import productManager from "../dao/fileSystem/productManager.js";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts(limit);
    res.status(200).json({ status: "success", products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: " Internal Server Error" });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(Number(pid));
    if (!product)
      return res
        .status(404)
        .json({ status: "Error", msg: "Product not found" });

    res.status(200).json({ status: "success", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.deleteProduct(Number(pid));
    if (!product)
      return res
        .status(404)
        .json({ status: "Error", msg: "Product not found" });

    res
      .status(200)
      .json({ status: "success", msg: `Product with id ${pid} was delete` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const body = req.body;
    const product = await productManager.updateProduct(Number(pid), body);
    if (!product)
      return res
        .status(404)
        .json({ status: "Error", msg: "Product not found" });

    res.status(200).json({ status: "success", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

router.post("/", checkProductData, async (req, res) => {
  try {
    const body = req.body;
    const product = await productManager.addProduct(body);

    res.status(201).json({ status: "success", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});
export default router;
