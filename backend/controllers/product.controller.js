const Product = require('../models/product.model');

exports.create = async (req, res) => {
  res.json(await Product.create(req.body));
};

exports.getAll = async (req, res) => {
  res.json(await Product.find());
};

exports.update = async (req, res) => {
  res.json(await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

exports.delete = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
