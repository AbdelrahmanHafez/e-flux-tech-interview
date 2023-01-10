import { Application, Request, Response } from 'express';
import Joke from '../../jokes/index';
import { makeCallback } from '../../../helpers/make.callback';


export default function getJoke (app: Application) {
  app.get('/api/jokes/random', makeCallback(controller));
}

export async function controller (req: Request, res: Response) {
  const { joke } = await Joke.getRandom();

  return res.send(joke);
}