const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const { category_master, product_master,productList ,get_product_master,get_category_master} = require("../controller/data");
router.get("/", get_category_master);
router.get("/Productlist",productList )
router.get("/ProductMaster",get_product_master);
router.post("/", category_master);
router.post("/ProductMaster",product_master );
module.exports = router;
