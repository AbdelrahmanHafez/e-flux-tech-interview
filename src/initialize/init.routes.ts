import { Application } from 'express';
import jokesRoutes from '../modules/jokes/jokes.routes';

export default function initRoutes (app: Application) {
  jokesRoutes(app);
}