import { stationsDB } from '../dbs/stations-db';
import { clearDB } from '../test/test.helpers';
import { injectConnector } from './inject-connector';


describe('injectConnector(...)', () => {
  beforeEach(() => {
    clearDB(stationsDB);
  });

  it('injects a connector with an id only when not present', () => {
    // Arrange
    const stationId = '1';
    const connectorId = 1;

    stationsDB[stationId] = {
      connectorsMap: {}
    };

    // Act
    injectConnector(stationId, connectorId);

    // Assert
    expect(stationsDB).toEqual({
      [stationId]: { connectorsMap: { [connectorId]: {} } }
    });
  });

  it('adding a connector with id only does not delete the lastReading', () => {
    // Arrange
    const stationId = '1';
    const connectorId = 1;

    stationsDB[stationId] = {
      connectorsMap: {
        [connectorId]: { lastReading: 12_345 }
      }
    };

    // Act
    injectConnector(stationId, connectorId);

    // Assert
    expect(stationsDB).toEqual({
      [stationId]: { connectorsMap: { [connectorId]: { lastReading: 12_345 } } }
    });
  });

  it('adds a reading to a non-existing connector', () => {
    // Arrange
    const stationId = '1';
    const connectorId = 1;

    stationsDB[stationId] = {
      connectorsMap: {}
    };

    // Act
    injectConnector(stationId, connectorId, 12_345);

    // Assert
    expect(stationsDB).toEqual({
      [stationId]: { connectorsMap: { [connectorId]: { lastReading: 12_345 } } }
    });
  });

  it('adds a reading to an existing connector', () => {
    // Arrange
    const stationId = '1';
    const connectorId = 1;

    stationsDB[stationId] = {
      connectorsMap: {
        'some-other-connector': {},
        [connectorId]: { lastReading: 12_345 }
      }
    };

    // Act
    injectConnector(stationId, connectorId, 67_890);

    // Assert
    expect(stationsDB).toEqual({
      [stationId]: {
        connectorsMap: {
          'some-other-connector': {},
          [connectorId]: { lastReading: 67_890 }
        }
      }
    });
  });
});