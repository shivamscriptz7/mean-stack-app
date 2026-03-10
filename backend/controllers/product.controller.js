// Import Product model
const Product = require('../models/product.model');

// Create a new product
// This API will insert product data into the database
exports.create = async (req, res) => {
  try {
    // req.body contains the product details sent from the client
    const product = await Product.create(req.body);

    // Send the created product as response
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products
// This API fetches all product records from the database
exports.getAll = async (req, res) => {
  try {
    const products = await Product.find();

    // Return list of all products
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product by ID
// This API updates existing product details
exports.update = async (req, res) => {
  try {
    // req.params.id contains the product id from the URL
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated document
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product by ID
// This API removes a product from the database
exports.delete = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    // Send confirmation message after deletion
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};