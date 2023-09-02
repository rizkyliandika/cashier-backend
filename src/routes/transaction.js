const { Router } = require("express");
const TransactionService = require("../services/transaction");
const middleware = require("../services/auth");

const TransactionRoute = Router()
  .get("/", middleware.verifyAuth, async (req, res) => {
    try {
      const data = await TransactionService.findAllTransaction(id);
      res
        .status(200)
        .json({ message: "Success get data transaction", data });
    } catch (error) {
      res.status(500).json({ message: error?.message });
    }
  })
  .get("/:id", middleware.verifyAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const data = await TransactionService.findTransactionById(id);
      res
        .status(200)
        .json({ message: "Success get data transaction by id", data });
    } catch (error) {
      res.status(500).json({ message: error?.message });
    }
  })
  .post("/", middleware.verifyAuth, async (req, res) => {
    try {
      const { total, tableNumber } = req.body;
      const data = await TransactionService.createTransaction({
        table_number: tableNumber,
        total: total,
      });
      res
        .status(200)
        .json({ message: "Success create data transaction", data });
    } catch (error) {
      res.status(500).json({ message: error?.message });
    }
  })
  .put("/:id", middleware.verifyAuth, async (req, res) => {
    try {
      const { total, tableNumber } = req.body;
      const { id } = req.params;
      const data = await TransactionService.updateTransaction(id, {
        table_number: tableNumber,
        total: total,
      });
      res
        .status(200)
        .json({ message: "Success update data transaction", data });
    } catch (error) {
      res.status(500).json({ message: error?.message });
    }
  })
  .delete("/:id", middleware.verifyAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const data = await TransactionService.deleteTransaction(id);
      res
        .status("200")
        .json({ message: "Success delete data transaction", data });
    } catch (error) {
      res.status(500).json({ message: error?.message });
    }
  });

module.exports = TransactionRoute;
