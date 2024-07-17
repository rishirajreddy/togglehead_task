import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validate = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        console.log(error)
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        next();
    };
};