import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { Review } from "../models/review.model.js";

const createReview = async (req, res) => {
  try {
    const { productId, orderId, rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }
    const user = req.user;

    // verify order exists and belongs to user
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.clerkId !== user.clerkId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to review this order" });
    }
    if (order.status !== "delivered") {
      return res
        .status(400)
        .json({ error: "Cannot review an order that is not delivered" });
    }
    // check if review already exists for this order and product
    const productInOrder = order.orderItems.find(
      (item) => item.product.toString() === productId.toString()
    );
    if (!productInOrder) {
      return res
        .status(400)
        .json({ error: "Product not found in the specified order" });
    }
    // check if review already exists for this order and product
    const existingReview = await Review.findOne({
      productId,
      userId: user._id,
    });
    if (existingReview) {
      return res
        .status(400)
        .json({ error: "Review already exists for this product in the order" });
    }

    // update the product rating in the order items
    const product = await Product.findById(productId);
    const reviews = await Review.find({ productId });
    const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0);
    product.averageRating = totalRating / reviews.length;
    await product.save();
    res.status(201).json({ message: "Review created successfully" });
  } catch (error) {
    console.error("Error in createReview controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const user = req.user;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    if (review.userId.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this review" });
    }
    await Review.findByIdAndDelete(reviewId);
    // update the product average rating
    const product = await Product.findById(review.productId);
    const reviews = await Review.find({ productId: review.productId });
    if (reviews.length === 0) {
      product.averageRating = 0;
    } else {
      const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0);
      product.averageRating = totalRating / reviews.length;
    }
    await product.save();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error in deleteReview controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { createReview, deleteReview };
