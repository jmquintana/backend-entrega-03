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
import { checkAdmin, checkUser, checkSession } from "../middlewares/auth.js";

const router = Router();

router.post("/", addCart);

router.get("/", checkAdmin, getCarts);

router.get("/:cid", checkSession, getCartById);

router.post("/:cid/product/:pid", checkUser, addProductToCart);

router.put("/:cid", checkUser, updateCart);

router.delete("/:cid/product/:pid", checkUser, deleteProductFromCart);

router.delete("/:cid/allProducts/:pid", checkUser, deleteAllProductFromCart);

router.delete("/:cid", deleteCart);

router.post("/:cid/purchase", checkUser, handlePurchase);

export default router;
