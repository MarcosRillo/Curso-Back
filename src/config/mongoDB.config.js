import mongoose from "mongoose"

export const connectMongoDB = async () => {
    try {
        mongoose.connect("mongodb+srv://Curso-Back:123@curso-back.02kol0r.mongodb.net/")
        console.log("MongoDB connected")
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}