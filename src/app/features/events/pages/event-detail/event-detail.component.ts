import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Observable, switchMap } from 'rxjs';
import { Event, EventStatus } from '../../../../core/domain/models/event.model';
import { EventFacade } from '../../../../core/application/event.facade';
import { StatusChipComponent } from '../../components/status-chip/status-chip.component';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    StatusChipComponent
  ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit {
  event$!: Observable<Event | undefined>;
  currentEvent: Event | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventFacade: EventFacade,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.event$ = this.route.params.pipe(
      switchMap(params => {
        const eventId = +params['id'];
        return this.eventFacade.getEventById(eventId);
      })
    );

    this.event$.subscribe(event => {
      this.currentEvent = event || null;
    });
  }

  goBack(): void {
    this.router.navigate(['/events']);
  }

  finishEvent(): void {
    if (this.currentEvent) {
      this.eventFacade.finishEvent(this.currentEvent.id).subscribe({
        next: (updatedEvent) => {
          this.currentEvent = updatedEvent;
          this.snackBar.open('Event marked as finished successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          this.snackBar.open('Failed to update event status', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  canFinishEvent(): boolean {
    return this.currentEvent?.status === EventStatus.SCHEDULED || 
           this.currentEvent?.status === EventStatus.IN_PROGRESS;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  }
}