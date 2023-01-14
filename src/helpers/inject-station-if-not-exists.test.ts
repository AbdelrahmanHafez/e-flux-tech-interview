import { stationsDB } from '../dbs/stations-db';
import { clearDB } from '../test/test.helpers';
import { injectStationIfNotExists } from './inject-station-if-not-exists';

describe('injectStationIfNotExists(...)', () => {
  beforeEach(() => {
    clearDB(stationsDB);
  });
  it('injects an empty station if none exists', () => {
    // Arrange
    const stationId = '1';

    // Act
    injectStationIfNotExists(stationId);

    // Assert
    expect(stationsDB).toEqual({
      [stationId]: { connectorsMap: {} }
    });
  });

  it('does nothing if a station is present', () => {
    // Arrange
    const stationId = '1';

    const station = {
      connectorsMap: {
        1: {},
        2: { lastReading: 12_345 }
      }
    };
    stationsDB[stationId] = station;

    // Act
    injectStationIfNotExists(stationId);

    // Assert
    expect(stationsDB[stationId]).toBe(station);
  });
});