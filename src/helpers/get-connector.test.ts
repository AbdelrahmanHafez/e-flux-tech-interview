import { stationsDB } from '../dbs/stations-db';
import { clearDB } from '../test/test.helpers';
import { getConnector } from './get-connector';

describe('getConnector(...)', () => {
  beforeEach(() => {
    clearDB(stationsDB);
  });

  it('returns the connector with the given id', () => {
    // Arrange
    const stationId = '1';
    const connectorId = '2';
    stationsDB[stationId] = {
      connectorsMap: {
        1: {},
        2: { lastReading: 12_345 }
      }
    };

    // Act
    const connector = getConnector(stationId, connectorId);

    // Assert
    expect(connector).toEqual({ lastReading: 12_345 });
  });

  it('returns undefined if the station does not exist', () => {
    // Arrange
    const stationId = '1';
    const connectorId = '2';

    // Act
    const connector = getConnector(stationId, connectorId);

    // Assert
    expect(connector).toBeUndefined();
  });

  it('returns undefined if the connector does not exist', () => {
    // Arrange
    const stationId = '1';
    const connectorId = '2';
    stationsDB[stationId] = {
      connectorsMap: {
        1: {}
      }
    };

    // Act
    const connector = getConnector(stationId, connectorId);

    // Assert
    expect(connector).toBeUndefined();
  });
});