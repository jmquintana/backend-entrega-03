import { productModel } from "../models/products.model.js";

class ProductsRepository {
	constructor() {}

	getProducts = async (limit, page, category, status, sort) => {
		try {
			limit = parseInt(limit) || 5;
			page = parseInt(page) || 1;
			let products = await productModel.paginate(
				{},
				{
					limit,
					page,
					lean: true,
				}
			);

			return products;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	getPaginatedProducts = async (filters, options) => {
		try {
			const result = await productModel.paginate(filters, options);
			return result;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	addProduct = async (product) => {
		try {
			const result = await productModel.create(product);
			return result;
		} catch (error) {
			console.error(error);
			return error;
		}
	};

	getProductById = async (productId) => {
		try {
			const result = await productModel.find({ _id: productId }).lean();
			return result[0];
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	addManyProducts = async (arrOfProducts) => {
		try {
			const result = await productModel.insertMany(arrOfProducts);
			return result;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	updateProduct = async (productId, changes) => {
		try {
			const result = await productModel.updateOne({ _id: productId }, changes);
			return result;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	deleteProduct = async (productId) => {
		try {
			const result = await productModel.deleteOne({ _id: productId });
			return result;
		} catch (error) {
			console.error(error);
			return error;
		}
	};
}

export const productsRepository = new ProductsRepository();
