import mongoose from 'mongoose'
import dotenv from 'dotenv'
export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_CONNECTIONSTRING);
        console.log("Kết nối CSDL thành công!")
    } catch {
        console.error("Lỗi kết nối CSDL: ", error);
        console.log("Lỗi kết nối CSDL")
    }
}