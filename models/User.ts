//user schema for users

import { models, Schema } from "mongoose"
import mongoose from "mongoose"
import { model } from "mongoose"


export interface User{
    _id: string,
    name: string,
    password: string,
    email: string,
    createdAt: Date,
    updatedAt: Date
}

const UserSchema = new Schema<User>({
    name: {
        required: [true, "Name is required"],
        type: String,
    },

    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email format"]
    },

    password: {
        type: String, 
        required: [true, "Password is required"]
    }
}, {
    timestamps: true
});


const User = mongoose.models?.User || model<User>("User", UserSchema)
export default User