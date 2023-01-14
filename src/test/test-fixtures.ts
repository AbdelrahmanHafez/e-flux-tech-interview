import { Event, MessageType } from '../event.types';

export const events: Event[] = [
  {
    correlationId: '374c7e67-1ed4-4149-bcbb-55852d4c0478',
    messageId: '1',
    occurredAt: '2022-01-01T00:00:00Z',
    messageType: MessageType.METER_VALUES_REQUEST,
    payload: {
      stationId: 'bbc15468-9bc4-47c1-8594-874404042bb6',
      connectorId: 1
    }
  },
  {
    correlationId: '39c2fc4a-70b7-4202-92fd-62e3e8935737',
    messageId: '3',
    occurredAt: '2022-01-02T00:01:00Z',
    messageType: MessageType.METER_VALUES_NOTIFICATION,
    payload: {
      stationId: 'bbc15468-9bc4-47c1-8594-874404042bb6',
      meterValues: [
        {
          connectorId: 1,
          reading: '23456'
        },
        {
          connectorId: 2,
          reading: '23457'
        }
      ]
    }
  },
  {
    correlationId: '374c7e67-1ed4-4149-bcbb-55852d4c0478',
    messageId: '2',
    occurredAt: '2022-01-01T00:01:00Z',
    messageType: MessageType.METER_VALUES_RESPONSE,
    payload: {
      meterValues: [
        {
          connectorId: 1,
          reading: '12345'
        }
      ]
    }
  },
  {
    correlationId: '75b61698-941f-4c92-a5ef-051a98409246',
    messageId: '1',
    occurredAt: '2022-01-05T00:01:00Z',
    messageType: MessageType.METER_VALUES_NOTIFICATION,
    payload: {
      stationId: '95b8c8af-66c8-4429-8133-3ae9002663a7',
      meterValues: [
        {
          connectorId: 1,
          reading: '20000'
        },
        {
          connectorId: 2,
          reading: '20001'
        },
        {
          connectorId: 3,
          reading: '20002'
        }
      ]
    }
  },
  {
    correlationId: '7facea91-83b5-411e-bba1-b174c57765db',
    messageId: '2',
    occurredAt: '2022-01-01T00:01:00Z',
    messageType: MessageType.CONNECTOR_LIST_REQUEST,
    payload: {
      stationId: '95b8c8af-66c8-4429-8133-3ae9002663a7'
    }
  },
  {
    correlationId: '7facea91-83b5-411e-bba1-b174c57765db',
    messageId: '3',
    occurredAt: '2022-01-03T00:02:00Z',
    messageType: MessageType.CONNECTOR_LIST_RESPONSE,
    payload: {
      numConnectors: 5
    }
  }
];