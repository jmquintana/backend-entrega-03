import { Router } from "express";
import { checkLogged, checkLogin, checkSession } from "../middlewares/auth.js";
import {
	renderPaginatedProducts,
	getProductById,
} from "../controllers/products.controller.js";
import {
	renderCartById,
	editProductQuantity,
} from "../controllers/carts.controller.js";

const router = Router();

router.get("/", checkLogin, renderPaginatedProducts);

router.get("/product/:pid", getProductById);

router.put("/:cid", editProductQuantity);

router.get("/cart/:cid", checkLogin, renderCartById);

router.get("/register", checkLogged, (req, res) => {
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
