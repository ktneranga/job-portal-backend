"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
class Validations {
    constructor() {
        this.userValidationSchema = celebrate_1.Joi.object({
            firstName: celebrate_1.Joi.string().required(),
            lastName: celebrate_1.Joi.string().required(),
            email: celebrate_1.Joi.string().email().required(),
            password: celebrate_1.Joi.string().required(),
            role: celebrate_1.Joi.string().required(),
            isActive: celebrate_1.Joi.string().required(),
        });
        this.validateUser = (0, celebrate_1.celebrate)({
            body: this.userValidationSchema,
        });
    }
}
exports.default = new Validations();
