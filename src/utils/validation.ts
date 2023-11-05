import { Joi, celebrate, Segments } from 'celebrate';

class Validations {
    userValidationSchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role: Joi.string().required(),
        isActive: Joi.string().required(),
    });

    validateUser = celebrate({
        body: this.userValidationSchema,
    });
}

export default new Validations();
