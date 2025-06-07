const express = require('express');
const { getProducts, getProduct, addProduct, deleteProduct, updateProduct, searchProducts } = require("../controllers/products");
const {authentication} = require("../middleware/authentication");
const router = express.Router();

router.route("/").get(authentication, getProducts).post(authentication, addProduct);
router.route("/:id").get(authentication, getProduct).put(authentication, updateProduct).delete(authentication, deleteProduct);
router.route("/search/:key").get(authentication, searchProducts);
module.exports = router;