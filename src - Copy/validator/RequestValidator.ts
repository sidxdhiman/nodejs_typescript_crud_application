import { Request, Response, NextFunction } from "express";
const Joi = require("@hapi/joi");
export class RequestValidator {
  public static patchUser(req:Request, res:Response, next: NextFunction) {
    const schema = Joi.object({
      userId: Joi.number(),
      name: Joi.string(), 
      password: Joi.string(),
      email: Joi.string()
    })
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
  }
  public static postUser(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      userId: Joi.number().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().lowercase().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
  }
}
