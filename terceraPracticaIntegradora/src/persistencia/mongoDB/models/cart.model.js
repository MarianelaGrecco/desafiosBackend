import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: {
    type: [
      {
        id_prod: {
          type: Schema.Types.ObjectID,
          ref: "products",
        },
        cant: {
          type: Number,
          default: 0,
        },
      },
    ],
    default: []
  },
});
export const cartModel = model("cart", cartSchema)

