const express = require("express");
const router = express.Router();

const Categoria = require("../controllers/categoria");
const Financa = require("../controllers/financa");

router.post("/create/categoria", Categoria.create);
router.get("/list/categoria/:page", Categoria.findAll);
router.put("/update/categoria/:id", Categoria.update);

router.post("/create/financa", Financa.create);
router.get("/list/financa/:page", Financa.findAll);
router.get("/list/financa/ds/:dateStart/de/:dateEnd/page/:page", Financa.findAllDate);
router.get("/listbycategory/financa/category/:category/page/:page", Financa.findByCategory);
router.get("/balancecategory/financa/category/:category", Financa.sumByCategory);
router.put("/update/financa/:id", Financa.update);
router.delete("/delete/financa/:id", Financa.delete);

module.exports = router;