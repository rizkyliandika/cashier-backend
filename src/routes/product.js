const { Router } = require("express");
const ProductService = require("../services/product");

const ProductRoute = Router()
  .get("/:brand", async (req, res) => {
    try {
      const { brand } = req.params;
      const data = await ProductService.findProductByBrand(brand);
      res
        .status(200)
        .json({ message: "Success get data product by brand", data });
    } catch (error) {
      res.status(500).json({ message: error?.message });
    }
  })
  .get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = await ProductService.findProductById(id);
      res.status(200).json({ message: "Success get data product by id", data });
    } catch (error) {
      res.status(500).json({ message: error?.message });
    }
  })
  .post("/", async (req, res) => {
    try {
      const { brand, price, active } = req.body;
      const data = await ProductService.createProduct({
        brand: brand,
        price: price,
        active: active,
      });
      res.status(200).json({ message: "Success create data product", data });
    } catch (error) {
      res.status(500).json({ message: error?.message });
    }
  })
  .put("/:id", async (req, res) => {
    try {
      const { brand, price, active } = req.body;
      const { id } = req.params;
      const data = await ProductService.updateProduct(id, {
        brand: brand,
        price: price,
        active: active,
      });
      res.status(200).json({ message: "Success update data product", data });
    } catch (error) {
      res.status(500).json({ message: error?.message });
    }
  })
  .delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = await ProductService.deleteProduct(id);
      res.status("200").json({ message: "Success delete data product", data });
    } catch (error) {
      res.status(500).json({ message: error?.message });
    }
  });

module.exports = ProductRoute;
