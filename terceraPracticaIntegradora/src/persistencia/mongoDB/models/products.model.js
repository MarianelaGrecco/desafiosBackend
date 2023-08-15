import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    index: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  thumbnail: [],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Users', 
  },
});

// Middleware para establecer el valor por defecto y verificar el rol
productSchema.pre('save', async function(next) {
  if (!this.owner) {
    const user = await usersModel.findOne({ role: 'premium' });
    if (user) {
      this.owner = user._id;
    }
  }
  next();
});

 export const productsModel = model("products", productSchema);
 