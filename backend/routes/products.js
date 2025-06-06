const express = require('express');
const { getProducts, getProduct, addProduct, deleteProduct, updateProduct, searchProducts } = require("../controllers/products");

const router = express.Router();

router.route("/").get(getProducts).post(addProduct);
router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);
router.route("/search/:key").get(searchProducts);
module.exports = router;