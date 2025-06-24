import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { Event } from '../../../../core/domain/models/event.model';
import { EventFacade } from '../../../../core/application/event.facade';
import { StatusChipComponent } from '../../components/status-chip/status-chip.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    StatusChipComponent
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  events$!: Observable<Event[]>;
  displayedColumns: string[] = ['id', 'startDate', 'location', 'status', 'actions'];

  constructor(
    private eventFacade: EventFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.events$ = this.eventFacade.getAllEvents();
  }

  viewEvent(eventId: number): void {
    this.router.navigate(['/events', eventId]);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}