import { Schema, Document, model } from "mongoose";
import bcrypt from "bcryptjs"
export interface IBanner extends Document {
    title?: string
    description?: string
    image_url: string
    order: number,
    redirect_url: string
}

const BannerSchema: Schema = new Schema<IBanner>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image_url: {
        type: String,
    },
    redirect_url: {
        type: String,
    },
    order: {
        type: Number
    }
}, { timestamps: true })


BannerSchema.index({ title: 1, order: 1 })

export default model<IBanner>("Banner", BannerSchema)