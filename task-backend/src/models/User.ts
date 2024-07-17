import { Schema, Document, model } from "mongoose";
import bcrypt from "bcryptjs"
export interface IUser extends Document {
    email: string;
    password: string;
    name?: string,
    phone?: string
    country_code?:string
    state?: string
    city?: string
    role?: string
}

const UserSchema: Schema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    country_code: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "authorized"],
        default: 'authorized'
    }
}, { timestamps: true })

UserSchema.pre<IUser>("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    const hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword;
    next()
})

UserSchema.index({ email: -1 })

export default model<IUser>("User", UserSchema)