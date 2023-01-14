import { stationsDB } from '../dbs/stations-db';

export function getConnectorsCount(stationId:string) {
  const station = stationsDB[stationId];
  const connectorsCountFromMap = Object.keys(station.connectorsMap).length;
  const connectorsCount = Math.max(station.connectorsCount || 0, connectorsCountFromMap);

  return { connectorsCount };
}