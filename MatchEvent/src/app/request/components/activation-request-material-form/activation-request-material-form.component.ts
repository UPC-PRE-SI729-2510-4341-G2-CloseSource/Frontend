// request/components/activation-request-material-form/activation-request-material-form.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialRequirement } from '../../model/activation-request.entity';
import { ActivationRequestService } from '../../services/activation-request.service';

@Component({
  selector: 'app-activation-request-material-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    TranslateModule
  ],
  templateUrl: './activation-request-material-form.component.html',
  styleUrl: './activation-request-material-form.component.css'
})
export class ActivationRequestMaterialFormComponent {
  @Input() activationRequestId!: number;
  @Output() close = new EventEmitter<void>();

  formData: MaterialRequirement = {
    name: '',
    quantity: 0,
    specification: '',
    providedByCompany: false
  };

  constructor(private requestService: ActivationRequestService) {}

  submitForm() {
    this.requestService.addMaterial(this.activationRequestId, this.formData).subscribe(() => {
      this.close.emit();
    });
  }

  cancelForm() {
    this.close.emit();
  }
}
