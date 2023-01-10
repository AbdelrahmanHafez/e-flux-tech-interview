import { Request, Response } from 'express';

export function reportError (err:unknown, req:Request, res:Response) {
  console.log(err);

  return res.status(500).json('Something bad happened, we know. We know.');
}