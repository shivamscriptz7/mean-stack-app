const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userId: Number,
  productIds: [mongoose.Schema.Types.ObjectId],
  totalAmount: Number
});

module.exports = mongoose.model('Order', schema);
