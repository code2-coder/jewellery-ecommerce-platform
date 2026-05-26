const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/ecommer";

mongoose.connect(uri)
  .then(async () => {
    console.log("Connected to MongoDB for updating banners...");
    const db = mongoose.connection;
    
    // Update the 'demo' banner
    await db.collection("banners").updateMany(
      { title: "demo" },
      { 
        $set: { 
          title: "Hues of Heritage", 
          subtitle: "Natural Gemstone Jewelry",
          buttonText: "Explore Hues"
        } 
      }
    );

    // Update any banners with "New Banner Title"
    await db.collection("banners").updateMany(
      { title: "New Banner Title" },
      { 
        $set: { 
          title: "The Gold Symphony", 
          subtitle: "Timeless 22K Masterpieces",
          buttonText: "Discover Gold"
        } 
      }
    );

    // Update any remaining "Optional Subtitle"
    await db.collection("banners").updateMany(
      { subtitle: "Optional Subtitle" },
      { 
        $set: { 
          subtitle: "Luminous Bridal Selection" 
        } 
      }
    );

    console.log("Banners updated successfully!");
    process.exit(0);
  })
  .catch(err => {
    console.error("Error connecting to database:", err);
    process.exit(1);
  });
