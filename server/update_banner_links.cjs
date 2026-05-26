const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/ecommer";

mongoose.connect(uri)
  .then(async () => {
    console.log("Connected to MongoDB for updating banner links...");
    const db = mongoose.connection;
    
    // Update the 'Hues of Heritage' banner link to point to rings
    await db.collection("banners").updateOne(
      { title: "Hues of Heritage" },
      { $set: { link: "/search/rings" } }
    );

    // Update the 'The Gold Symphony' banner link to point to gold
    await db.collection("banners").updateMany(
      { title: "The Gold Symphony" },
      { $set: { link: "/search/gold" } }
    );

    console.log("Banner links updated to redirect to live search pages successfully!");
    process.exit(0);
  })
  .catch(err => {
    console.error("Error connecting to database:", err);
    process.exit(1);
  });
