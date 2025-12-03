// Define empty functions
import cloudinary from "../config/cloudinary.js";

import { Product } from "../models/product.model.js";

import { Order } from "../models/Order.model.js";

import { User } from "../models/user.model.js";

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required." });
    }
    if (req.files.length > 3) {
      return res
        .status(400)
        .json({ message: "A maximum of 3 images are allowed." });
    }
    const uploadPromises = req.files.map((file) =>
      cloudinary.uploader.upload(file.path, { folder: "products" })
    );

    const uploadResults = await Promise.all(uploadPromises);
    const imageUrls = uploadResults.map((result) => result.secure_url);
    console.log(imageUrls);
    const product = await Product.create({
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      category,
      images: imageUrls,
    });
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.log("error while creating product", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: "Products fetched successfully", products });
  } catch (error) {
    console.log("error while fetching products", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (pr !== undefined) product.price = parseFloat(price);
    if (stock !== undefined) product.stock = parseInt(stock);
    if (category) product.category = category;

    if (req.files && req.files.length > 0) {
      if (req.files.length > 3) {
        return res
          .status(400)
          .json({ message: "A maximum of 3 images are allowed." });
      }
      const uploadPromises = req.files.map((file) =>
        cloudinary.uploader.upload(file.path, { folder: "products" })
      );
      const uploadResults = await Promise.all(uploadPromises);
      product.images = uploadResults.map((result) => result.secure_url);
    }
    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.log("error while updating product", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product")
      .sort({ createdAt: -1 });
    res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    console.log("error while fetching orders", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    if (!["pending", "shipped", "delivered"].includes(status)) {
      return res.status(400).json({
        message:
          "Invalid status value it should be one of pending, shipped, delivered",
      });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
    order.status = status;
    if (status === "shipped" && !order.shippedAt) {
      order.shippedAt = new Date();
    }
    if (status === "delivered" && !order.deliveredAt) {
      order.deliveredAt = new Date();
    }

    await order.save();
    res
      .status(200)
      .json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.log("error while updating order status", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};
const getAllCustomers = async (_, res) => {
  try {
    const customers = await User.find().sort({ createdAt: -1 });
    if (customers.length === 0) {
      return res.status(404).json({ message: "No customers found." });
    }
    res
      .status(200)
      .json({ message: "Customers fetched successfully", customers });
  } catch (error) {
    console.log("error while fetching customers", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};
const getDashboardStats = async (_, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);
    const totalRevenue =
      revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;
    const totalCustomers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      message: "Dashboard stats fetched successfully",
      stats: {
        totalOrders,
        totalRevenue,
        totalCustomers,
        totalProducts,
      },
    });
  } catch (error) {
    console.log("error while fetching dashboard stats", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    await product.remove();
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.log("error while deleting product", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

export {
  createProduct,
  getAllCustomers,
  getAllOrders,
  getAllProducts,
  getDashboardStats,
  updateOrderStatus,
  updateProduct,
  deleteProduct,
};
