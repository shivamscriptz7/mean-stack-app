const Order = require('../models/order.model'); // importing Order model

exports.create = async (req, res) => {
  res.json(await Order.create(req.body)); // create a new order
};

exports.getById = async (req, res) => {
  res.json(await Order.findById(req.params.id)); // get order details by id
};

exports.update = async (req, res) => {
  res.json(await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })); // update order by id
};

exports.delete = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id); // delete order by id
  res.json({ message: 'Order deleted' }); // send delete confirmation
};