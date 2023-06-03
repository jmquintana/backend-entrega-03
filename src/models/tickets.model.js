import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
	ticketId: { type: String, required: true },
	code: {
		type: String,
		required: true,
		unique: true,
	},
	purchaseDatetime: {
		type: Date,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	purchaser: {
		type: String,
		required: true,
	},
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
