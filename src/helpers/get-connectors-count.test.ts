import { stationsDB } from '../dbs/stations-db';
import { clearDB } from '../test/test.helpers';
import { getConnectorsCount } from './get-connectors-count';

describe('getConnectorsCount(...)', () => {
  beforeEach(() => {
    clearDB(stationsDB);
  });

  it('returns `connectorsCount` as the number of ids in `connectorsMap` if present', () => {
    // Arrange
    const stationId = '1';
    stationsDB[stationId] = {
      connectorsMap: {
        1: {},
        2: { lastReading: 12_345 }
      }
    };

    // Act
    const { connectorsCount } = getConnectorsCount(stationId);

    // Assert
    expect(connectorsCount).toBe(2);
  });

  it('returns the larger number between the connectors count and the connectors map length', () => {
    // Arrange
    const stationId = '1';
    stationsDB[stationId] = {
      connectorsMap: {
        1: {},
        2: { lastReading: 12_345 }
      },
      connectorsCount: 5
    };

    // Act
    const { connectorsCount } = getConnectorsCount(stationId);

    // Assert
    expect(connectorsCount).toBe(5);
  });
});