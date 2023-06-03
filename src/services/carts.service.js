import { cartsRepository } from "../repositories/carts.repository.js";
import { productsRepository } from "../repositories/products.repository.js";

class CartsService {
	constructor() {}

	getCarts = async () => {
		const carts = await cartsRepository.getCarts();
		return carts;
	};

	addCart = async (cart) => {
		const result = await cartsRepository.addCart(cart);
		return result;
	};

	getCartById = async (cartId) => {
		const cart = await cartsRepository.getCartById(cartId);

		if (!cart) return console.log("Cart not found");

		const { products } = cart;

		if (!products) return console.log("Products not found");

		const cartIsEmpty = !cart.products?.length;

		// Calculate sub total price of each product
		products.forEach((product) => {
			product.subTotal = product.product?.price * product.quantity || 0;
		});
		// Calculate total price of all products
		const totalPrice = products.reduce((acc, product) => {
			return acc + parseFloat(product.subTotal);
		}, 0);

		const result = { cart, cartId, cartIsEmpty, products, totalPrice };

		return result;
	};

	addProductToCart = async (productId, cartId, quantity = 1) => {
		const result = await cartsRepository.addProductToCart(
			productId,
			cartId,
			quantity
		);
		return result;
	};

	updateCart = async (cartId, products) => {
		const result = await cartsRepository.updateCart(cartId, products);
		return result;
	};

	editProductQuantity = async (productId, cartId, quantity) => {
		const result = await cartsRepository.editProductInCart(
			productId,
			cartId,
			quantity
		);
		return result;
	};

	deleteCart = async (cartId) => {
		const result = await cartsRepository.deleteCart(cartId);
		return result;
	};

	deleteProductFromCart = async (productId, cartId) => {
		const result = await cartsRepository.deleteProductFromCart(
			productId,
			cartId
		);
		return result;
	};

	getCartCount = async (cartId) => {
		const cart = await cartsRepository.getCartById(cartId);
		return cart?.products?.length || 0;
	};

	deleteAllProductsFromCart = async (productId, cartId) => {
		const result = await cartsRepository.deleteAllProductsFromCart(
			productId,
			cartId
		);
		return result;
	};

	handlePurchase = async (cartId) => {
		//get cart products
		const cart = await cartsRepository.getCartById(cartId);
		const productsInCart = cart.products.map((product) => {
			const prd = {
				_id: product.product._id,
				quantity: product.quantity,
			};
			return prd;
		});

		//for all products in cart from store
		const productInStorePromise = [];
		productsInCart.forEach(async (product) => {
			productInStorePromise.push(
				new Promise((resolve, reject) => {
					resolve(productsRepository.getProductById(product._id));
				})
			);
		});
		const productsInStore = await Promise.all(productInStorePromise).then(
			(res) =>
				res.map((product) => {
					const prd = {
						_id: product._id,
						quantity: product.stock,
					};
					return prd;
				})
		);

		const productsPurchased = productsInCart.map((product, i) => {
			return {
				_id: product._id,
				quantity: Math.min(
					productsInCart[i].quantity,
					productsInStore[i].quantity
				),
			};
		});

		const productsRemaining = productsInCart.map((product, i) => {
			return {
				_id: product._id,
				quantity: productsInStore[i].quantity - productsPurchased[i].quantity,
			};
		});

		const productsOutOfStock = productsInCart
			.map((product, i) => {
				const quantity =
					productsInCart[i].quantity - productsPurchased[i].quantity;
				if (!quantity) return;

				return {
					_id: product._id,
					quantity,
				};
			})
			.filter((element) => element !== undefined);

		// Update stock with products productsRemaining
		productsRemaining.forEach((product) => {
			productsRepository.updateProduct(product._id, {
				stock: product.quantity,
			});
		});

		// Update cart with productsOutOfStock
		const productsNewCart = productsOutOfStock.map((product) => {
			return {
				product: product._id,
				quantity: product.quantity,
			};
		});
		cartsRepository.updateCart(cartId, productsNewCart);

		// Create ticket with productsPurchased
		productsPurchased.forEach((product) => {});

		console.log({
			productsInCart,
			productsInStore,
			productsPurchased,
			productsRemaining,
			productsOutOfStock,
		});
	};
}

export const cartsService = new CartsService();
