import { stationsDB } from '../dbs/stations-db';

export function injectConnectorsCount(stationId: string, connectorsCount: number) {
  const station = stationsDB[stationId];
  if (connectorsCount != null) {
    station.connectorsCount = connectorsCount;
  }
}