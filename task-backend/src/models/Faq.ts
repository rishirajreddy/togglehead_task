import { Schema, Document, model } from "mongoose";
export interface IFaq extends Document {
    question?: string
    answer?: string
    order: number,
}

const FaqSchema: Schema = new Schema<IFaq>({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    order: {
        type: Number
    }
}, { timestamps: true })

export default model<IFaq>("Faq", FaqSchema)