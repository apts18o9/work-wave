import mongoose from "mongoose"

export const connectDB = async () => {
    try {
     
        const MONGODB_URI = process.env.MONGODB_URI
        if (!MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables")
        }

        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI)

        // Check connection state
        if (mongoose.connection.readyState === 1) {
            console.log("MongoDB connected successfully")
            return true
        }

        throw new Error("MongoDB connection failed")

    } catch (err) {
        console.error("MongoDB connection error:", err)
        throw err
    }
}