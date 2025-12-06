import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { ENV } from "../config/env.js";

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    description:
      "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and travelers.",
    price: 149.99,
    stock: 50,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500",
    ],
    averageRating: 4.5,
    totalReviews: 128,
  },
  {
    name: "Smart Watch Series 5",
    description:
      "Advanced fitness tracking, heart rate monitor, GPS, and water-resistant design. Stay connected with notifications and apps on your wrist.",
    price: 299.99,
    stock: 35,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",
    ],
    averageRating: 4.7,
    totalReviews: 256,
  },
  {
    name: "Leather Crossbody Bag",
    description:
      "Handcrafted genuine leather bag with adjustable strap. Features multiple compartments and elegant design perfect for daily use.",
    price: 89.99,
    stock: 25,
    category: "Fashion",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500",
    ],
    averageRating: 4.3,
    totalReviews: 89,
  },
  {
    name: "Running Shoes - Pro Edition",
    description:
      "Lightweight running shoes with responsive cushioning and breathable mesh upper. Designed for performance and comfort during long runs.",
    price: 129.99,
    stock: 60,
    category: "Sports",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
    ],
    averageRating: 4.6,
    totalReviews: 342,
  },
  {
    name: "Bestselling Mystery Novel",
    description:
      "A gripping psychological thriller that will keep you on the edge of your seat. New York Times bestseller with over 1 million copies sold.",
    price: 24.99,
    stock: 100,
    category: "Books",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
    ],
    averageRating: 4.8,
    totalReviews: 1243,
  },
  {
    name: "Portable Bluetooth Speaker",
    description:
      "Waterproof wireless speaker with 360-degree sound, 12-hour battery life, and durable design. Perfect for outdoor adventures.",
    price: 79.99,
    stock: 45,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500",
    ],
    averageRating: 4.4,
    totalReviews: 167,
  },
  {
    name: "Classic Denim Jacket",
    description:
      "Timeless denim jacket with vintage wash and comfortable fit. A wardrobe essential that pairs perfectly with any outfit.",
    price: 69.99,
    stock: 40,
    category: "Fashion",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500",
    ],
    averageRating: 4.2,
    totalReviews: 95,
  },
  {
    name: "Yoga Mat Pro",
    description:
      "Extra-thick non-slip yoga mat with carrying strap. Eco-friendly material provides excellent cushioning and grip for all yoga styles.",
    price: 49.99,
    stock: 75,
    category: "Sports",
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500",
    ],
    averageRating: 4.5,
    totalReviews: 203,
  },
  {
    name: "Mechanical Keyboard RGB",
    description:
      "Gaming keyboard with customizable RGB lighting, mechanical switches, and programmable keys. Built for gamers and typing enthusiasts.",
    price: 119.99,
    stock: 30,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    ],
    averageRating: 4.7,
    totalReviews: 421,
  },
  {
    name: "Coffee Table Book Collection",
    description:
      "Stunning photography book featuring architecture and design from around the world. Hardcover edition with 300+ pages of inspiration.",
    price: 39.99,
    stock: 55,
    category: "Fashion",
    images: [
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500",
    ],
    averageRating: 4.6,
    totalReviews: 134,
  },

  // 🔥 NEW PRODUCTS ADDED BELOW
  {
    name: "JVX Unisex Premium Sweatshirt Hoodie",
    description:
      "Soft and durable fleece hoodie designed for everyday comfort. Features a relaxed unisex fit, ribbed cuffs, and breathable fabric — ideal for casual wear, gym, and winter layering.",
    price: 529,
    stock: 60,
    category: "Fashion",
    images: [
      "https://m.media-amazon.com/images/I/61SOAIN5udL._SY550_.jpg",
      "https://m.media-amazon.com/images/I/51sSJUx8mwL._SY550_.jpg",
      "https://m.media-amazon.com/images/I/81XyARMWd+L._SY550_.jpg",
    ],
    averageRating: 4.4,
    totalReviews: 142,
  },
  {
    name: "Glowic Oversized Winter Hoodie for Men",
    description:
      "Trendy oversized sweatshirt crafted for winter comfort. Warm inner lining makes it perfect for travel, gym, streetwear, and daily use. Fashionable fit with premium stitching.",
    price: 899,
    stock: 55,
    category: "Fashion",
    images: [
      "https://m.media-amazon.com/images/I/51Q-16vDx4L._SY550_.jpg",
      "https://m.media-amazon.com/images/I/61FP5-GbRxL._SY550_.jpg",
      "https://m.media-amazon.com/images/I/81iuyfzCcnL._SX425_.jpg",
    ],
    averageRating: 4.6,
    totalReviews: 201,
  },
  {
    name: "MIA FASHION Men's Water-Resistant Full Sleeve Jacket",
    description:
      "A lightweight, water-resistant jacket with zipper closure and inner pocket. Designed for bikers and outdoor activities with weather protection and stylish fit.",
    price: 1199,
    stock: 45,
    category: "Fashion",
    images: [
      "https://m.media-amazon.com/images/I/61SD6NfzdpL._SX522_.jpg",
      "https://m.media-amazon.com/images/I/614TeFDlhpL._SX522_.jpg",
      "https://m.media-amazon.com/images/I/81Prsadk-3L._SX522_.jpg",
    ],
    averageRating: 4.5,
    totalReviews: 167,
  },
  {
    name: "MIA FASHION UV-Protection Sunscreen Jacket UPF 50+",
    description:
      "Lightweight regular-fit jacket engineered with UPF 50+ UV protection. Features a stand collar, breathable fabric and zipper closure — perfect for sunny outdoors and daily wear.",
    price: 999,
    stock: 50,
    category: "Fashion",
    images: [
      "https://m.media-amazon.com/images/I/61LxCD0PZEL._SX522_.jpg",
      "https://m.media-amazon.com/images/I/71N3-NMXxkL._SX522_.jpg",
      "https://m.media-amazon.com/images/I/71rkEpeZ73L._SX522_.jpg",
    ],
    averageRating: 4.3,
    totalReviews: 121,
  },
  {
    name: "SHAIRA FASHION Men's Lightweight Quarter-Zip Sweatshirt",
    description:
      "A cozy cotton fleece hoodie with quarter-zip closure for adjustable comfort. Ideal for winter, everyday use, and casual outings — lightweight yet warm.",
    price: 799,
    stock: 70,
    category: "Fashion",
    images: [
      "https://m.media-amazon.com/images/I/619shTklLPL._SX425_.jpg",
      "https://m.media-amazon.com/images/I/61sJVHYMPPL._SX425_.jpg",
      "https://m.media-amazon.com/images/I/71MzXTnruHL._SX425_.jpg",
    ],
    averageRating: 4.4,
    totalReviews: 153,
  },
  {
    name: "Leriya Fashion Men's Cargo Track Pants",
    description:
      "Comfort-fit cargo trousers with multiple utility pockets. Built with breathable fabric and a low-rise design — suitable for trekking, casual wear, and travel.",
    price: 699,
    stock: 75,
    category: "Fashion",
    images: [
      "https://m.media-amazon.com/images/I/51eG0cxt1fL._SY550_.jpg",
      "https://m.media-amazon.com/images/I/61L9mU56d7L._SY550_.jpg",
      "https://m.media-amazon.com/images/I/61oK92JLiSL._SY550_.jpg",
    ],
    averageRating: 4.2,
    totalReviews: 108,
  },
  {
    name: "Ben Martin Men's Standard Length Puffer Bomber Jacket",
    description:
      "Winter-ready nylon bomber jacket with a stylish casual fit. Provides warmth without bulk — ideal for riders and everyday street style.",
    price: 1399,
    stock: 40,
    category: "Fashion",
    images: [
      "https://m.media-amazon.com/images/I/51V4MLpObQL._SX522_.jpg",
      "https://m.media-amazon.com/images/I/51qQTCde+AL._SY550_.jpg",
      "https://m.media-amazon.com/images/I/41XqDR1hGTL._SY550_.jpg",
    ],
    averageRating: 4.5,
    totalReviews: 184,
  },
  {
    name: "THE BEAR HOUSE Men Blue Checked Slim-Fit Cotton Linen Shirt",
    description:
      "A premium slim-fit casual shirt crafted from a cotton-linen blend for breathability and comfort. Features a refined blue check pattern suitable for office and weekend wear.",
    price: 999,
    stock: 62,
    category: "Fashion",
    images: [
      "https://m.media-amazon.com/images/I/418cgZ2ogeL._SY445_SX342_QL70_ML2_.jpg",
      "https://m.media-amazon.com/images/I/71sHGKlBDDL._SY550_.jpg",
      "https://m.media-amazon.com/images/I/81IGM8YERML._SY550_.jpg",
    ],
    averageRating: 4.7,
    totalReviews: 268,
  },
  {
    name: "THE BEAR HOUSE Men's Multicolour Checked Flannel Shirt",
    description:
      "Soft pure-cotton flannel shirt offering warmth and flexibility. Classic checked pattern makes it ideal for casual outings and winter layering.",
    price: 1099,
    stock: 53,
    category: "Fashion",
    images: [
      "https://m.media-amazon.com/images/I/61xegqdyevL._SY550_.jpg",
      "https://m.media-amazon.com/images/I/81KPCrVTqDL._SY550_.jpg",
      "https://m.media-amazon.com/images/I/81Eh5-X7vEL._SY550_.jpg",
    ],
    averageRating: 4.6,
    totalReviews: 231,
  },
  {
    name: "THE BEAR HOUSE Men Brown Striped Slim-Fit Cotton Shirt",
    description:
      "Stylish slim-fit shirt with a brown striped pattern made from breathable cotton fabric. Perfect for both casual and semi-formal looks.",
    price: 949,
    stock: 64,
    category: "Fashion",
    images: [
      "https://m.media-amazon.com/images/I/61UfOtDOKuL._SY550_.jpg",
      "https://m.media-amazon.com/images/I/71z3MmgxTeL._SY550_.jpg",
      "https://m.media-amazon.com/images/I/818RoiGcn-L._SY550_.jpg",
    ],
    averageRating: 4.4,
    totalReviews: 156,
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(ENV.DB_URL);
    console.log("✅ Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany({});
    console.log("🗑️  Cleared existing products");

    // Insert seed products
    await Product.insertMany(products);
    console.log(`✅ Successfully seeded ${products.length} products`);

    // Display summary
    const categories = [...new Set(products.map((p) => p.category))];
    console.log("\n📊 Seeded Products Summary:");
    console.log(`Total Products: ${products.length}`);
    console.log(`Categories: ${categories.join(", ")}`);

    // Close connection
    await mongoose.connection.close();
    console.log("\n✅ Database seeding completed and connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
