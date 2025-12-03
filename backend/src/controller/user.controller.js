import { User } from "../models/user.model";

// File: /c:/Users/sarka/Desktop/expo-ecommerce/backend/src/controller/user.controller.js
const addAddress = async (req, res) => {
  try {
    const {
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault,
    } = req.body;

    const user = req.user;
    if (
      !label ||
      !fullName ||
      !streetAddress ||
      !city ||
      !state ||
      !zipCode ||
      !phoneNumber
    ) {
      return res
        .status(400)
        .json({ message: "All address fields are required" });
    }
    if (isDefault) {
      user.addresses.forEach((address) => (address.isDefault = false));
    }
    user.addresses.push({
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault: isDefault || false,
    });
    await user.save();
    res.status(201).json({
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.log("Error while adding address");
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getAddresses = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ addresses: user.addresses });
  } catch (error) {}
};

const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const user = req.user;
    const address = user.addresses.id(addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }
    address.label = label || address.label;
    address.fullName = fullName || address.fullName;
    address.streetAddress = streetAddress || address.streetAddress;
    address.city = city || address.city;
    address.state = state || address.state;
    address.zipCode = zipCode || address.zipCode;
    address.phoneNumber = phoneNumber || address.phoneNumber;
    address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;
    await user.save();
    res.status(200).json({
      message: "Address updated successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.log("Error while updating address");
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const user = req.user;
    user.addresses.pull(addressId);
    await address.remove();
    await user.save();
    res.status(200).json({
      message: "Address deleted successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.log("Error while deleting address");
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }
    user.wishlist.push(productId);
    await user.save();
    res
      .status(200)
      .json({ message: "Product added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.log("Error while adding to wishlist");
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");

    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    console.log("Error while fetching wishlist");
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    if (!user.wishlist.includes(productId)) {
      return res.status(400).json({ message: "Product not in wishlist" });
    }

    user.wishlist.pull(productId);
    await user.save();

    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    console.log("Error while removing from wishlist");
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export {
  addAddress,
  addToWishlist,
  deleteAddress,
  getAddresses,
  getWishlist,
  removeFromWishlist,
  updateAddress,
};
