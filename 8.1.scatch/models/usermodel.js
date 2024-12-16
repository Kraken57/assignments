const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URL);

const userSchema = new Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: String,
  password: String,
  cart: {
    type: Array,
    default: [],
  },
  isadmin: Boolean,
  orders: {
    type: Array,
    default: [],
  },
  contact: Number,
  picture: String,
});

const userModel = mongoose.model("users", userSchema);

module.exports = {
  userModel: userModel,
};
