# E-Flux stations readings event handler

This is an event handler for the stations readings coming for E-Flux stations connectors readings.

The solution is written in TypeScript and Node.js, we're using an in-memory DB to store this information, in real life we'd use a proper DB.

## How to run the tests
```bash
git clone git@github.com:AbdelrahmanHafez/e-flux-tech-interview.git
cd ./e-flux-tech-interview
npm install
npm test
```

## Solution:
To answer the questions asked, we store the data coming from the events into a "Stations DB", and "Correlations DB".

### Stations DB:
Each entry in StationsDB represents a station. Each station has multiple connectors, each connector has an id, and lastReading.

Notes about StationsDB:
* We receive an event called `ConnectorListResponse`, which returns the number of connectors, but no other information about it. So we store this number in the DB.
* We receive an event called `MeterValuesRequest` that includes the `connectorId` only, but not the reading value. So if the connectorId is not in the DB yet, we create a new entry for it with the reading value as `null`.

### Correlations DB:
Because `stationId` is not present in all the events payloads, we need a way to find which station this event belongs to, so we store each request `correlationId` with the `stationId` it belongs to in CorrelationDB.


## Questions we're trying to answer:
### 1- How many connectors does each charging station have?

With StationsDB seeded with the data from all the events, we have two pieces of information to answer this question:

1- By looking at the number of connectors (with possible readings) in a station.
2- By looking at the `numConnectors` value from `ConnectorListResponse` if present.

So to handle this, we're taking the max value between the two, assuming that connectors are always added, and never removed. This is probably not a good assumption, but it's the best we can do with the information I have.

### 2- Is our current view of the number of charging stations correct?
According to the events that come to us, we have 3 stations, with multiple connectors, so yes.

I'm guessing by "charging station" we're referring to the connector, in which case, this question refers to the assumption noted in the first question, so no. We get `numConnectors` as 5 in the station with id `95b8c8af-66c8-4429-8133-3ae9002663a7`, but in the `MeterValuesNotification` we receive 3 connectors readings, so we're missing 2 connectors.

### 3- What is the meter read value for each connector on the station?
We can get this information by looking at the `lastReading` value for each connector in the stations DB.
