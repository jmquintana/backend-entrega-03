import { Router } from "express";
import {
	checkRegistered,
	checkLogin,
	checkSession,
	checkAdmin,
	checkUser,
} from "../middlewares/auth.js";
import {
	renderPaginatedProducts,
	renderProduct,
} from "../controllers/products.controller.js";
import {
	renderCartById,
	editProductQuantity,
	renderCarts,
} from "../controllers/carts.controller.js";

const router = Router();

router.get("/", checkLogin, renderPaginatedProducts);

router.get("/carts", checkAdmin, renderCarts);

router.get("/product/:pid", renderProduct);

router.put("/:cid", editProductQuantity);

router.get("/cart/:cid", checkLogin, renderCartById);

router.get("/register", checkRegistered, (req, res) => {
	res.render("register");
});

router.get("/login", checkSession, (req, res) => {
	res.render("login");
});

router.get("/profile", checkLogin, (req, res) => {
	res.render("profile", { user: req.session.user });
});

router.get("/restore", (req, res) => {
	res.render("restore");
});

export default router;
