import axios from 'axios';
import { IJoke } from '../index';

const RANDOM_JOKE_API_PATH = 'https://api.chucknorris.io/jokes/random';

export default async function getRandomJoke () {
  const { data: joke }: { data: IJoke } = await axios.get(RANDOM_JOKE_API_PATH);

  return { joke: joke.value };
}