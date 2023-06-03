import { cartsService } from "../services/carts.service.js";

export async function renderCartById(req, res) {
	const cartId = req.params.cid;
	const result = await cartsService.getCartById(cartId);
	return res.render("cart", result);
}

export async function editProductQuantity(req, res) {
	const cartId = req.params.cid;
	const productId = req.body.productId;
	const newQuantity = req.body.newQuantity;
	const result = await cartsService.editProductQuantity(
		cartId,
		productId,
		newQuantity
	);
	return res.send({ status: "Success", result });
}

export async function addCart(req, res) {
	const result = await cartsService.addCart();
	return res.send({ status: "Success", result });
}

export async function getCarts(req, res) {
	const result = await cartsService.getCarts();
	return res.send({ status: "Success", result });
}

export async function getCartById(req, res) {
	const cartId = req.params.cid;
	const result = await cartsService.getCartById(cartId);
	return res.send({ status: "Success", result });
}

export async function addProductToCart(req, res) {
	const cartId = req.params.cid;
	const productId = req.params.pid;
	const result = await cartsService.addProductToCart(productId, cartId);
	return res.send({ status: "Success", result });
}

export async function updateCart(req, res) {
	const cartId = req.params.cid;
	const products = req.body.products;
	const result = await cartsManager.updateCart(cartId, products);
	return res.send({ status: "Success", result });
}

export async function deleteProductFromCart(req, res) {
	const cartId = req.params.cid;
	const productId = req.params.pid;
	const result = await cartsService.deleteProductFromCart(productId, cartId);
	return res.send({ status: "Success", result });
}

export async function deleteAllProductFromCart(req, res) {
	const cartId = req.params.cid;
	const productId = req.params.pid;
	const result = await cartsService.deleteAllProductsFromCart(
		productId,
		cartId
	);
	return res.send({ status: "Success", result });
}

export async function deleteCart(req, res) {
	const cartId = req.params.cid;
	const result = await cartsService.deleteCart(cartId);
	return res.send({ status: "Success", result });
}
