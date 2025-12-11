import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";
import logger from "../utils/logger";

const validate =
  (schema: ZodObject<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      res.status(400);
      if (error instanceof ZodError) {
        logger.error(`Zod validation error: ${error.message.toString()}`);
        res.send(error.message);
      } else {
        logger.error(`Unexpected validation error: ${error}`);
        res.send("Invalid request.");
      }
    }
  };

export default validate;
