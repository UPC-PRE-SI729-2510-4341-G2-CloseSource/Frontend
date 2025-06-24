import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event, EventStatus } from '../domain/models/event.model';
import { EventMockService } from '../infrastructure/event-mock.service';

@Injectable({
  providedIn: 'root'
})
export class EventFacade {
  constructor(private eventMockService: EventMockService) {}

  getAllEvents(): Observable<Event[]> {
    return this.eventMockService.getAllEvents();
  }

  getEventById(id: number): Observable<Event | undefined> {
    return this.eventMockService.getEventById(id);
  }

  finishEvent(eventId: number): Observable<Event> {
    return this.eventMockService.updateEventStatus(eventId, EventStatus.FINISHED);
  }

  cancelEvent(eventId: number): Observable<Event> {
    return this.eventMockService.updateEventStatus(eventId, EventStatus.CANCELLED);
  }
}