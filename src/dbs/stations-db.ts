export const stationsDB: IStationsDB = {};

type IStationsDB = Record<string, IStation>;

type IStation = {
  connectorsMap: IConnectorsMap,

  // we have `CONNECTOR_LIST_RESPONSE` that returns the number of connectors
  // so when we want to get the number of connectors we'll get it from `connectorsCount`
  // if we have it. Otherwise, the second best guess is the ids count in `connectorsMap`.
  connectorsCount?: number,
};

interface IConnectorsMap {
  [connectorId: string]: {
    lastReading?: number
  }
}