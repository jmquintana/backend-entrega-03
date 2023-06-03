import { Router } from "express";
import {
	addCart,
	getCarts,
	getCartById,
	addProductToCart,
	updateCart,
	deleteProductFromCart,
	deleteAllProductFromCart,
	deleteCart,
	handlePurchase,
} from "../controllers/carts.controller.js";

const router = Router();

router.post("/", addCart);

router.get("/", getCarts);

router.get("/:cid", getCartById);

router.post("/:cid/product/:pid", addProductToCart);

router.put("/:cid", updateCart);

router.delete("/:cid/product/:pid", deleteProductFromCart);

router.delete("/:cid/allProducts/:pid", deleteAllProductFromCart);

router.delete("/:cid", deleteCart);

router.post("/:cid/purchase", handlePurchase);

export default router;
