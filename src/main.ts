import { Event } from './event.types';
import { handleEventForCorrelationsDB } from './handlers/handle-event-for-correlations-db';
import { handleEventForStationsDB } from './handlers/handle-event-for-stations-db';

export function handleEvent(event: Event) {
  handleEventForCorrelationsDB(event);
  handleEventForStationsDB(event);
}