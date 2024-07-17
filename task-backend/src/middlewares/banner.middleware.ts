import Joi from "joi"

export const bannerCreateSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    image_url: Joi.string(),
    order: Joi.number()
})
