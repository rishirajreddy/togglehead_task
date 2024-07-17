"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        console.log(error);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        next();
    };
};
exports.validate = validate;
