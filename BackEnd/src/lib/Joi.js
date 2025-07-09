import Joi from "joi";


export const signUpValid = (obj)=>{
    const schema = Joi.object({
      fullName: Joi.string().required().min(3),
      email: Joi.string().email().required().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      password: Joi.string().required().min(6),
    });
    return schema.validate(obj);
}

export const loginValidate = (obj)=>{
  const schema = Joi.object({
        email: Joi.string().email().required().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        password: Joi.string().required().min(6),
    });
    return schema.validate(obj);
}

export const onbordingValidate = (obj)=>{
  const schema = Joi.object({
    fullName: Joi.string().required().min(3),
    bio: Joi.string().required().min(3),
    nativeLanguage: Joi.string().required(),
    learningLanguage: Joi.string().required(),
    location: Joi.string().required(),
    profilePic: Joi.string()
  });
  return schema.validate(obj);
}