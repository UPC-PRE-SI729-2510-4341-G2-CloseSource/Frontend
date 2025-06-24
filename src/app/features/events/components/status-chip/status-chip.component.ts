import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { EventStatus } from '../../../../core/domain/models/event.model';

@Component({
  selector: 'app-status-chip',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './status-chip.component.html',
  styleUrl: './status-chip.component.css'
})
export class StatusChipComponent {
  @Input() status!: EventStatus;

  getChipColor(): string {
    switch (this.status) {
      case EventStatus.SCHEDULED:
        return 'primary';
      case EventStatus.IN_PROGRESS:
        return 'accent';
      case EventStatus.FINISHED:
        return 'success';
      case EventStatus.CANCELLED:
        return 'warn';
      default:
        return '';
    }
  }

  getStatusText(): string {
    switch (this.status) {
      case EventStatus.SCHEDULED:
        return 'Scheduled';
      case EventStatus.IN_PROGRESS:
        return 'In Progress';
      case EventStatus.FINISHED:
        return 'Finished';
      case EventStatus.CANCELLED:
        return 'Cancelled';
      default:
        return '';
    }
  }
}