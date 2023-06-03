// import ProductManager from "../managers/ProductManager.js";
import { Router } from "express";
import { uploader } from "../utils.js";
import {
	getProducts,
	getProductById,
	addProduct,
	addManyProducts,
	updateProduct,
	deleteProduct,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", getProducts);

router.get("/:pid", getProductById);

router.post("/", uploader.array("thumbnails", 10), addProduct);

router.post("/many", addManyProducts);

router.put("/:pid", updateProduct);

router.delete("/:pid", deleteProduct);

export default router;
