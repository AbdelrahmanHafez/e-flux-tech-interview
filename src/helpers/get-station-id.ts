import { correlationsDB } from '../dbs/correlations-db';
import { LogicalError } from '../errors/logical-error';
import { ConnectorListRequestEvent, Event } from '../event.types';

export function getStationId(event: Event) {
  const stationIdFromPayload = (event as ConnectorListRequestEvent).payload?.stationId;
  if (stationIdFromPayload) {
    return stationIdFromPayload;
  }

  const stationIdFromCorrelation = correlationsDB[event.correlationId];
  if (!stationIdFromCorrelation) {
    throw new LogicalError(`No stationId found for correlationId ${event.correlationId}, event: ${JSON.stringify(event)}`);
  }

  return stationIdFromCorrelation;
}