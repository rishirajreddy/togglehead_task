import Joi from "joi"

export const userCreateSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
})

