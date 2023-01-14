import { stationsDB } from '../dbs/stations-db';

export function injectStationIfNotExists(stationId:string) {
  if (stationsDB[stationId]) {
    return;
  }

  stationsDB[stationId] = { connectorsMap: {} };
}