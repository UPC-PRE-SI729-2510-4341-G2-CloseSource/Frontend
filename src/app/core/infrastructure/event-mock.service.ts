import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { Event, EventStatus, GalleryItem } from '../domain/models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventMockService {
  private readonly mockEvents: Event[] = [
    {
      id: 1,
      proposalId: 101,
      startDate: '2024-02-15T14:00:00Z',
      endDate: '2024-02-15T18:00:00Z',
      status: EventStatus.SCHEDULED,
      description: 'Annual Tech Conference - Exploring the future of AI and Machine Learning in modern applications.',
      location: 'San Francisco Convention Center',
      gallery: [
        { imageUrl: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg', caption: 'Main conference hall setup' },
        { imageUrl: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg', caption: 'Speaker preparation area' },
        { imageUrl: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg', caption: 'Networking zone' }
      ]
    },
    {
      id: 2,
      proposalId: 102,
      startDate: '2024-02-20T09:00:00Z',
      endDate: '2024-02-20T17:00:00Z',
      status: EventStatus.IN_PROGRESS,
      description: 'Angular Developer Workshop - Hands-on training for building scalable web applications.',
      location: 'Microsoft Technology Center, Seattle',
      gallery: [
        { imageUrl: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg', caption: 'Workshop participants coding' },
        { imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg', caption: 'Instructor demonstration' }
      ]
    },
    {
      id: 3,
      proposalId: 103,
      startDate: '2024-01-10T10:00:00Z',
      endDate: '2024-01-10T16:00:00Z',
      status: EventStatus.FINISHED,
      description: 'Product Launch Event - Unveiling our latest software solutions for enterprise clients.',
      location: 'Tesla Gigafactory, Austin',
      gallery: [
        { imageUrl: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg', caption: 'Product demonstration' },
        { imageUrl: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg', caption: 'Team presentation' },
        { imageUrl: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg', caption: 'Q&A session' },
        { imageUrl: 'https://images.pexels.com/photos/2747446/pexels-photo-2747446.jpeg', caption: 'Networking reception' }
      ]
    },
    {
      id: 4,
      proposalId: 104,
      startDate: '2024-03-05T13:00:00Z',
      endDate: '2024-03-05T19:00:00Z',
      status: EventStatus.CANCELLED,
      description: 'Mobile Development Summit - Due to unforeseen circumstances, this event has been cancelled.',
      location: 'Google Campus, Mountain View',
      gallery: []
    },
    {
      id: 5,
      proposalId: 105,
      startDate: '2024-02-25T08:00:00Z',
      endDate: '2024-02-25T20:00:00Z',
      status: EventStatus.SCHEDULED,
      description: 'DevOps & Cloud Infrastructure Conference - Best practices for modern deployment strategies.',
      location: 'Amazon Web Services Summit Center, Las Vegas',
      gallery: [
        { imageUrl: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg', caption: 'Cloud infrastructure demo' },
        { imageUrl: 'https://images.pexels.com/photos/3184635/pexels-photo-3184635.jpeg', caption: 'DevOps tools showcase' }
      ]
    }
  ];

  private eventsSubject = new BehaviorSubject<Event[]>(this.mockEvents);
  public events$ = this.eventsSubject.asObservable();

  getAllEvents(): Observable<Event[]> {
    return this.events$.pipe(delay(300)); // Simulate network delay
  }

  getEventById(id: number): Observable<Event | undefined> {
    const event = this.eventsSubject.value.find(e => e.id === id);
    return of(event).pipe(delay(200));
  }

  updateEventStatus(eventId: number, status: EventStatus): Observable<Event> {
    const events = this.eventsSubject.value;
    const eventIndex = events.findIndex(e => e.id === eventId);
    
    if (eventIndex !== -1) {
      const updatedEvent = { ...events[eventIndex], status };
      const updatedEvents = [...events];
      updatedEvents[eventIndex] = updatedEvent;
      
      this.eventsSubject.next(updatedEvents);
      return of(updatedEvent).pipe(delay(200));
    }
    
    throw new Error(`Event with ID ${eventId} not found`);
  }
}