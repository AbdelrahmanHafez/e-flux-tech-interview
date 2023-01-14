import { stationsDB } from '../dbs/stations-db';
import { clearDB } from '../test/test.helpers';
import { injectConnectorsCount } from './inject-connectors-count';


describe('injectConnectorsCount(...)', () => {
  beforeEach(() => {
    clearDB(stationsDB);
  });

  it('injects the connectors count', () => {
    // Arrange
    const stationId = '1';
    const newConnectorsCount = 2;

    stationsDB[stationId] = {
      connectorsMap: {},
      connectorsCount: 1
    };

    // Act
    injectConnectorsCount(stationId, newConnectorsCount);

    // Assert
    expect(stationsDB).toEqual({
      [stationId]: { connectorsMap: {}, connectorsCount: newConnectorsCount }
    });
  });
});