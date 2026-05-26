import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

// @desc    Get admin summary statistics
// @route   GET /api/admin/summary
// @access  Private/Admin
export const getAdminSummary = async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        const ordersCount = await Order.countDocuments();
        const productsCount = await Product.countDocuments();
        const categoriesCount = await Category.countDocuments();

        const totalSalesAggregation = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice" },
                },
            },
        ]);

        const totalSales = totalSalesAggregation.length > 0 ? totalSalesAggregation[0].totalSales : 0;

        const dailyOrders = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    orders: { $sum: 1 },
                    sales: { $sum: "$totalPrice" },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        // Fetch recent 5 orders
        const recentOrders = await Order.find({})
            .populate("user", "name")
            .sort({ createdAt: -1 })
            .limit(5);

        // Top Selling Products
        const topProducts = await Order.aggregate([
            { $unwind: "$orderItems" },
            { 
                $group: { 
                    _id: "$orderItems.name", 
                    qty: { $sum: "$orderItems.qty" },
                    revenue: { $sum: { $multiply: ["$orderItems.price", "$orderItems.qty"] } }
                } 
            },
            { $sort: { qty: -1 } },
            { $limit: 5 }
        ]);

        // Revenue Breakdown by Category
        const categoryRevenue = await Order.aggregate([
            { $unwind: "$orderItems" },
            { 
                $lookup: {
                    from: "products",
                    localField: "orderItems.product",
                    foreignField: "_id",
                    as: "productDoc"
                }
            },
            { $unwind: "$productDoc" },
            {
                $group: {
                    _id: "$productDoc.category",
                    revenue: { $sum: { $multiply: ["$orderItems.price", "$orderItems.qty"] } }
                }
            }
        ]);

        res.json({
            users: usersCount,
            orders: ordersCount,
            products: productsCount,
            categories: categoriesCount,
            sales: totalSales,
            dailyOrders,
            recentOrders,
            topProducts,
            categoryRevenue
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
