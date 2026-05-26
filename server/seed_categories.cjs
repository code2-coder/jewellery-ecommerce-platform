const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/ecommer";

const defaultCategories = [
  {
    name: "Rings",
    image: "/images/large_gold_ring.png",
    link: "/search/rings",
  },
  {
    name: "Earrings",
    image: "/images/fine_earrings.png",
    link: "/search/earrings",
  },
  {
    name: "Bracelets",
    image: "/images/artisan_bracelet.png",
    link: "/search/bracelet",
  },
  {
    name: "Gold Coins",
    image: "/images/large_gold_ring.png",
    link: "/search/gold",
  },
  {
    name: "Mia",
    image: "/images/fine_earrings.png",
    link: "/search/mia",
  }
];

mongoose.connect(uri)
  .then(async () => {
    console.log("Connected to MongoDB for seeding categories...");
    const db = mongoose.connection;
    
    // Clear existing categories
    await db.collection("categories").deleteMany({});
    
    // Insert defaults
    await db.collection("categories").insertMany(defaultCategories);
    
    console.log("Default categories seeded successfully!");
    process.exit(0);
  })
  .catch(err => {
    console.error("Error seeding categories:", err);
    process.exit(1);
  });
