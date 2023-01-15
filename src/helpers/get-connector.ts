import { stationsDB } from '../dbs/stations-db';

export function getConnector(stationId:string, connectorId:string) {
  const station = stationsDB[stationId];
  const connector = station?.connectorsMap[connectorId];

  return connector;
}