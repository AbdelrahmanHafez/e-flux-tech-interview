import cloneDeep from 'lodash.clonedeep';
import { clearDB } from '../test/test.helpers';
import { stationsDB } from '../dbs/stations-db';
import {
  MessageType,
  MeterValuesRequestEvent,
  MeterValuesResponseEvent,
  ConnectorListRequestEvent,
  ConnectorListResponseEvent,
  MeterValuesNotificationEvent
} from '../event.types';
import * as fixtures from '../test/test-fixtures';
import { handleEventForStationsDB } from './handle-event-for-stations-db';
import { handleEventForCorrelationsDB } from './handle-event-for-correlations-db';
import { correlationsDB } from '../dbs/correlations-db';

describe('handleEventForStationsDB(...)', () => {
  beforeEach(() => {
    clearDB(stationsDB);
  });

  it(`adds a connector with no reading for ${MessageType.METER_VALUES_REQUEST}`, () => {
    // Arrange
    const events = cloneDeep(fixtures.events);
    const event = events.find((event) => {
      return event.messageType === MessageType.METER_VALUES_REQUEST;
    })as MeterValuesRequestEvent;

    // Act
    handleEventForStationsDB(event);

    // Assert
    expect(stationsDB[event.payload.stationId].connectorsMap).toEqual({
      1: {}
    });
  });

  it(`adds a connector with reading for ${MessageType.METER_VALUES_RESPONSE}`, () => {
    // Arrange
    const events = cloneDeep(fixtures.events);
    const requestEvent = events.find((event) => {
      return event.messageType === MessageType.METER_VALUES_REQUEST;
    }) as MeterValuesRequestEvent;

    handleEventForCorrelationsDB(requestEvent);
    handleEventForStationsDB(requestEvent);

    const responseEvent = events.find((event) => {
      return event.messageType === MessageType.METER_VALUES_RESPONSE;
    }) as MeterValuesResponseEvent;

    const stationId = correlationsDB[responseEvent.correlationId];

    // Act
    handleEventForStationsDB(responseEvent);

    // Assert
    expect(stationsDB[stationId].connectorsMap).toEqual({ 1: { lastReading: 12_345 } });
  });

  it(`injects the station if not present for ${MessageType.CONNECTOR_LIST_REQUEST}`, () => {
    // Arrange
    const events = cloneDeep(fixtures.events);
    const event = events.find((event) => {
      return event.messageType === MessageType.CONNECTOR_LIST_REQUEST;
    }) as ConnectorListRequestEvent;

    // Act
    handleEventForStationsDB(event);

    // Assert
    expect(stationsDB[event.payload.stationId]).toEqual({ connectorsMap: {} });
  });

  it(`injects \`connectorsCount\` in station for ${MessageType.CONNECTOR_LIST_RESPONSE}`, () => {
    // Arrange
    const events = cloneDeep(fixtures.events);

    const requestEvent = events.find((event) => {
      return event.messageType === MessageType.CONNECTOR_LIST_REQUEST;
    }) as ConnectorListRequestEvent;

    handleEventForCorrelationsDB(requestEvent);

    const responseEvent = events.find((event) => {
      return event.messageType === MessageType.CONNECTOR_LIST_RESPONSE;
    }) as ConnectorListResponseEvent;

    // Act
    handleEventForStationsDB(responseEvent);

    // Assert
    const stationId = correlationsDB[responseEvent.correlationId];
    expect(stationsDB[stationId]).toEqual({
      connectorsMap: {},
      connectorsCount: 5
    });
  });

  it(`adds connectors with readings for ${MessageType.METER_VALUES_NOTIFICATION}`, () => {
    // Arrange
    const events = cloneDeep(fixtures.events);

    const event = events.find((event) => {
      return event.messageType === MessageType.METER_VALUES_NOTIFICATION;
    }) as MeterValuesNotificationEvent;

    // Act
    handleEventForStationsDB(event);

    // Assert
    const expectedConnectorsMap = {
      1: { lastReading: 23_456 },
      2: { lastReading: 23_457 }
    };
    expect(stationsDB[event.payload.stationId].connectorsMap).toEqual(expectedConnectorsMap);
  });
});