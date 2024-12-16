const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: String,
  password: String,
  products: {
    type: Array,
    default: [],
  },
  picture: String,
  gstin: String,
});

const adminModel = mongoose.model("admins", adminSchema);

module.exports = {
    adminModel: adminModel,
};

