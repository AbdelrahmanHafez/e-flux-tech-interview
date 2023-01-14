import { correlationsDB } from '../dbs/correlations-db';
import { clearDB } from '../test/test.helpers';
import cloneDeep from 'lodash.clonedeep';
import * as fixtures from '../test/test-fixtures';
import { ConnectorListRequestEvent } from '../event.types';
import { getStationId } from './get-station-id';

describe('getStationId(...)', () => {
  beforeEach(() => {
    clearDB(correlationsDB);
  });

  it('gets the station id from the payload when present', () => {
    // Arrange
    const events = cloneDeep(fixtures.events);
    const event = events.find((event) => {
      return (event as ConnectorListRequestEvent).payload?.stationId;
    }) as ConnectorListRequestEvent;

    // Act
    const stationId = getStationId(event);

    // Assert
    expect(stationId).toEqual(event.payload.stationId);
  });

  it('gets the station id from the correlations db when not present', () => {
    // Arrange
    const events = cloneDeep(fixtures.events);
    const event = events.find((event) => {
      return !(event as ConnectorListRequestEvent).payload.stationId;
    });

    const expectedStationId = 'station-id';

    correlationsDB[event.correlationId] = expectedStationId;

    // Act
    const result = getStationId(event);

    // Assert
    expect(result).toEqual(expectedStationId);
  });

  it('throws an error when unable to get the station id', () => {
    // Arrange
    const events = cloneDeep(fixtures.events);
    const event = events.find((event) => {
      return !(event as ConnectorListRequestEvent).payload.stationId;
    });

    // Act && Assert
    expect(() => getStationId(event)).toThrow(/No stationId found for correlationId/);
  });
});