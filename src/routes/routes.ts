import express, { Router,Request, Response, NextFunction, Handler  } from "express";
import { AccessTokenController } from "../controllers/AccessTokenController";
import { HistoryGeneratorController } from "../controllers/HistoryGeneratorController";



const resolver = (handlerFn: Handler) =>{
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      return await Promise.resolve(handlerFn(request, response, next));
    } catch (e) {
      return next(e);
    }
  }
}

const router = Router();

const accessTokenController = new AccessTokenController;

const historyGeneratorController = new HistoryGeneratorController



router.post('/token', resolver(accessTokenController.handle))

router.post('/history', resolver(historyGeneratorController.handle))




export { router }