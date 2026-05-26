import mongoose from "mongoose";
import dotenv from "dotenv";
import products from "./data/products.js";
import User from "./models/User.js";
import Product from "./models/Product.js";

dotenv.config();

mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/ecommer")
    .then(() => console.log("MongoDB Connected for Seeding"))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

const importData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        // Create Admin user
        const createdUsers = await User.create([
            {
                name: "Admin User",
                email: "admin@aurelia.com",
                password: "password123", // Will be hashed by pre-save
                role: "admin"
            }
        ]);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        await Product.insertMany(sampleProducts);

        console.log("Data Imported successfully!");
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed!");
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
