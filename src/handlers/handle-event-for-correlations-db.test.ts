import cloneDeep from 'lodash.clonedeep';
import { clearDB } from '../test/test.helpers';
import { correlationsDB } from '../dbs/correlations-db';
import { MessageType, ConnectorListRequestEvent, MeterValuesRequestEvent } from '../event.types';
import * as fixtures from '../test/test-fixtures';
import { handleEventForCorrelationsDB } from './handle-event-for-correlations-db';

describe('handleEventForCorrelationsDB(...)', () => {
  beforeEach(() => {
    clearDB(correlationsDB);
  });

  it('injects correlation for events that have `stationId', () => {
    // Arrange
    const events = cloneDeep(fixtures.events);

    const event = events.find((event) => {
      return event.messageType === MessageType.METER_VALUES_REQUEST;
    }) as MeterValuesRequestEvent;

    // Act
    handleEventForCorrelationsDB(event);

    // Assert
    expect(correlationsDB).toEqual({
      [event.correlationId]: event.payload.stationId
    });
  });

  it('ignores events that do not have `stationId`', () => {
    // Arrange
    const events = cloneDeep(fixtures.events);

    const [event] = events;
    delete (event as ConnectorListRequestEvent).payload.stationId;

    // Act
    handleEventForCorrelationsDB(event);

    // Assert
    expect(correlationsDB).toEqual({});
  });
});