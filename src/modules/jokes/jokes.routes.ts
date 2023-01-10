import { Application } from 'express';
import routes from './routes/index';

export default function jokesRoutes (app: Application) {
  routes.getRandomJoke(app);
}