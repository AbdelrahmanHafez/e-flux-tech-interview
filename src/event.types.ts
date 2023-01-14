export type Event = MeterValuesRequestEvent |
  MeterValuesResponseEvent |
  MeterValuesNotificationEvent |
  ConnectorListRequestEvent |
  ConnectorListResponseEvent

export enum MessageType {
  METER_VALUES_REQUEST = 'MeterValuesRequest',
  METER_VALUES_RESPONSE = 'MeterValuesResponse',
  CONNECTOR_LIST_REQUEST = 'ConnectorListRequest',
  CONNECTOR_LIST_RESPONSE = 'ConnectorListResponse',
  METER_VALUES_NOTIFICATION = 'MeterValuesNotification',
}
export interface MeterValuesRequestEvent extends GenericEvent {
  messageType: MessageType.METER_VALUES_REQUEST,
  payload: {
    stationId: string;
    connectorId: number;
  }
}
export interface MeterValuesResponseEvent extends GenericEvent {
  messageType: MessageType.METER_VALUES_RESPONSE,
  payload: {
    meterValues: {
      connectorId: number;
      reading: string;
    }[];
  }
}

export interface ConnectorListRequestEvent extends GenericEvent {
  messageType: MessageType.CONNECTOR_LIST_REQUEST,
  payload: {
    stationId: string;
  }
}

export interface ConnectorListResponseEvent extends GenericEvent {
  messageType: MessageType.CONNECTOR_LIST_RESPONSE,
  payload: {
    numConnectors: number
  }
}

export interface MeterValuesNotificationEvent extends GenericEvent {
  messageType: MessageType.METER_VALUES_NOTIFICATION,
  payload: {
    stationId: string;
    meterValues: {
      connectorId: number;
      reading: string;
    }[];
  }
}

interface GenericEvent {
  correlationId: string;
  messageId: string;
  occurredAt: string;
}