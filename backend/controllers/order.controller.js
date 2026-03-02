const Order = require('../models/order.model');

exports.create = async (req, res) => {
  res.json(await Order.create(req.body));
};

exports.getById = async (req, res) => {
  res.json(await Order.findById(req.params.id));
};

exports.update = async (req, res) => {
  res.json(await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

exports.delete = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: 'Order deleted' });
};
