import { correlationsDB } from '../dbs/correlations-db';
import { ConnectorListRequestEvent, Event } from '../event.types';

export function handleEventForCorrelationsDB(event:Event) {
  const stationId = (event as ConnectorListRequestEvent).payload?.stationId;
  if (stationId) {
    correlationsDB[event.correlationId] = stationId;
  }
}