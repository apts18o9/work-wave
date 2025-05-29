import mongoose from "mongoose"
const {MONGODB_URI} = process.env
export const connectDB = async () => {
    try{
        const connection = await mongoose.connect(MONGODB_URI as string)
        if(mongoose.connection.readyState === 1){
            return Promise.resolve(true)
        }
    }catch(err){
        console.log(err);
        return Promise.reject(err)
        
    }

    //if ready state not 1 default return
    return Promise.reject(new Error("database connection failed"))
}