import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ActivationRequestService } from '../../services/activation-request.service';
import { ActivationRequest } from '../../model/activation-request.entity';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-activation-request-create-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    TranslatePipe
  ],
  templateUrl: './activation-request-create-page.component.html',
  styleUrls: ['./activation-request-create-page.component.css']
})
export class ActivationRequestCreatePageComponent {
  private fb = inject(FormBuilder);
  private requestService = inject(ActivationRequestService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    companyId: [1, Validators.required], // temporal
    status: ['IN_PROGRESS', Validators.required]
  });

  statuses = ['IN_PROGRESS', 'ACCEPTED', 'REJECTED', 'CANCELLED'];

  onSubmit(): void {
    if (this.form.invalid) return;
    const data = this.form.value as ActivationRequest;
    this.requestService.create(data).subscribe({
      next: () => this.router.navigate(['/requests']),
      error: err => alert('Error: ' + err.message)
    });
  }
}
