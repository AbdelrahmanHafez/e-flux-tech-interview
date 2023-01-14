import { stationsDB } from '../dbs/stations-db';

export function injectConnector(
  stationId: string,
  connectorId: number,
  lastReading?: number
) {
  const station = stationsDB[stationId];

  if (!station.connectorsMap[connectorId]) {
    station.connectorsMap[connectorId] = {};
  }

  if (lastReading != null) {
    station.connectorsMap[connectorId].lastReading = lastReading;
  }
}