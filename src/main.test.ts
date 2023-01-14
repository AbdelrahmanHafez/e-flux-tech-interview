import cloneDeep from 'lodash.clonedeep';
import { correlationsDB } from './dbs/correlations-db';
import { stationsDB } from './dbs/stations-db';
import { clearDB } from './test/test.helpers';
import * as fixtures from './test/test-fixtures';

describe('handleEvent(...)', () => {
  beforeEach(() => {
    clearDB(correlationsDB);
    clearDB(stationsDB);
  });

  it('should handle event for correlationsDB and stationsDB', () => {
    // Arrange
    const events = cloneDeep(fixtures.events);

    const mockHandleEventForCorrelationsDB = jest.fn();
    const mockHandleEventForStationsDB = jest.fn();

    jest.mock('./handlers/handle-event-for-correlations-db', () => ({
      handleEventForCorrelationsDB: mockHandleEventForCorrelationsDB
    }));
    jest.mock('./handlers/handle-event-for-stations-db', () => ({
      handleEventForStationsDB: mockHandleEventForStationsDB
    }));

    const { handleEvent } = require('./main');

    // Act
    for (const event of events) {
      handleEvent(event);
    }

    // Assert
    expect(mockHandleEventForCorrelationsDB).toHaveBeenCalledTimes(events.length);
    expect(mockHandleEventForCorrelationsDB).toHaveBeenCalledTimes(events.length);
  });
});