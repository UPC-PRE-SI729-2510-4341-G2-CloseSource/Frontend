// request/components/activation-request-event-date-form/activation-request-event-date-form.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { EventDateRange } from '../../model/activation-request.entity';
import { ActivationRequestService } from '../../services/activation-request.service';

@Component({
  selector: 'app-activation-request-event-date-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule
  ],
  templateUrl: './activation-request-event-date-form.component.html',
  styleUrl: './activation-request-event-date-form.component.css'
})
export class ActivationRequestEventDateFormComponent {
  @Input() activationRequestId!: number;
  @Output() close = new EventEmitter<void>();

  formData: EventDateRange = {
    startDate: '',
    endDate: ''
  };

  constructor(private requestService: ActivationRequestService) {}

  submitForm() {
    this.requestService.updateEventDateRange(this.activationRequestId, this.formData).subscribe(() => {
      this.close.emit();
    });
  }

  cancelForm() {
    this.close.emit();
  }
}
