//for registrating users

"use server" //executes on server side, but calls from client side
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"


export const register = async (values: any) => {
    const {email, password, name} = values;

    try{
        await connectDB()
        const userFound = await User.findOne({email})
        if(userFound){
            return {
                error: "Email already exists"
            }
        }

        const hashedPassword = await bcrypt.hash(password, 6);
        const user = new User({
            name,
            email,
            password: hashedPassword
        })
        const savedUser = await user.save();
        //returning success
        return{
            success: true,
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email

            }
        }
        
    }catch(err){
        console.log(err);
        return {
            error: "Failed to register user"
        }
        
    }
}