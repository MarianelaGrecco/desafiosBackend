import mongoose, { Schema } from 'mongoose'

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    default: 0,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
  },
  role: {
    type: String,
    default: 'user',
  },
  isAdmid: {
    type: Boolean,
    default: false
  }
})

export const usersModel = mongoose.model('Users', usersSchema)