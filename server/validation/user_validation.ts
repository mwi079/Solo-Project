import Joi from "@hapi/joi";

export const userValidation = (user:Object) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(user);
};

 export const loginValidation = (data:Object) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

