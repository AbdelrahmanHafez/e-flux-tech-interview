import { Request, Response } from 'express';
import { makeCallback } from '../../../helpers/make.callback';
import { controller } from './jokes.get.random.route';
import Joke from '../index';

describe('/api/jokes/random', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const controllerWithErrorHandling = makeCallback(controller);

  it('returns a chuck norris joke', async () => {
    // Arrange
    const jokeContent = 'Chuck Norris can divide by zero.';

    const send = jest.fn().mockImplementation(() => {
      return true;
    });

    (Joke.getRandom as jest.Mock).mockReturnValue({ joke: jokeContent });

    // Act
    await controllerWithErrorHandling(
      {} as unknown as Request,
      { send } as unknown as Response
    );

    // Assert
    expect(send).toBeCalledWith('Chuck Norris can divide by zero.');
  });

  it('returns an error with 500 on `Joke.getRandom` failure', async () => {
    // Arrange
    const json = jest.fn().mockImplementation(() => {
      return true;
    });
    const status = jest.fn().mockImplementation(() => {
      return {
        json
      };
    });

    (Joke.getRandom as jest.Mock).mockImplementation(() => {
      throw new Error('API IS DOWN!');
    });

    // Act
    await controllerWithErrorHandling(
      {} as unknown as Request,
      { status } as unknown as Response
    );

    // Assert
    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith('Something bad happened, we know. We know.');
  });

});

jest.mock('../index.ts', () => {
  const actualModule = jest.requireActual('../index');

  return {
    ...actualModule,
    getRandom: jest.fn()
  };
});