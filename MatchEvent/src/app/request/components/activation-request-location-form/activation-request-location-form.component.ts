// request/components/activation-request-location-form/activation-request-location-form.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { ActivationRequestService } from '../../services/activation-request.service';

@Component({
  selector: 'app-activation-request-location-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    TranslatePipe,
  ],
  templateUrl: './activation-request-location-form.component.html',
  styleUrl: './activation-request-location-form.component.css'
})
export class ActivationRequestLocationFormComponent {
  @Input() activationRequestId!: number;
  @Input() initialData?: any;
  @Output() close = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private requestService: ActivationRequestService) {
    this.form = this.fb.group({
      address: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      imageUrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.initialData) {
      this.form.patchValue({
        address: this.initialData.address,
        latitude: this.initialData.coordinates?.latitude,
        longitude: this.initialData.coordinates?.longitude,
        capacity: this.initialData.capacity,
        imageUrl: this.initialData.imageUrl,
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const location = {
        address: this.form.value.address,
        coordinates: {
          latitude: this.form.value.latitude,
          longitude: this.form.value.longitude,
        },
        capacity: this.form.value.capacity,
        imageUrl: this.form.value.imageUrl,
      };
      this.requestService.updateLocation(this.activationRequestId, location).subscribe(() => {
        this.close.emit();
      });
    }
  }

  onCancel(): void {
    this.close.emit();
  }
}
