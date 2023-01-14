import { Event, MessageType } from '../event.types';
import { getStationId } from '../helpers/get-station-id';
import { injectConnector } from '../helpers/inject-connector';
import { injectConnectorsCount } from '../helpers/inject-connectors-count';
import { injectStationIfNotExists } from '../helpers/inject-station-if-not-exists';

export function handleEventForStationsDB(event: Event) {
  const stationId = getStationId(event);
  injectStationIfNotExists(stationId);

  switch (event.messageType) {
    case MessageType.METER_VALUES_REQUEST: {
      injectConnector(stationId, event.payload.connectorId);
      return;
    }

    case MessageType.METER_VALUES_RESPONSE:
    case MessageType.METER_VALUES_NOTIFICATION: {
      for (const meterValue of event.payload.meterValues) {
        injectConnector(stationId, meterValue.connectorId, Number(meterValue.reading));
      }
      return;
    }

    case MessageType.CONNECTOR_LIST_REQUEST: {
      return;
    }

    case MessageType.CONNECTOR_LIST_RESPONSE: {
      injectConnectorsCount(stationId, event.payload.numConnectors);
      return;
    }
  }
}