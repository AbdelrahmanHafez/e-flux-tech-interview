import { Request, Response, NextFunction } from 'express';
import { reportError } from './report.error';

export function makeCallback (providedFunction: Function) {
  return async function (req: Request, res: Response, next?: NextFunction) {
    try {
      await providedFunction(req, res, next);
    } catch (err) {
      reportError(err, req, res);
    }
  };
}