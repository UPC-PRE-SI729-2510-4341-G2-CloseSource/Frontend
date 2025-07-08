// request/components/activation-request-audience-profile-form/activation-request-audience-profile-form.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudienceProfile } from '../../model/activation-request.entity';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { ActivationRequestService } from '../../services/activation-request.service';

@Component({
  selector: 'app-activation-request-audience-profile-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    TranslateModule
  ],
  templateUrl: './activation-request-audience-profile-form.component.html',
  styleUrl: './activation-request-audience-profile-form.component.css'
})
export class ActivationRequestAudienceProfileFormComponent {
  @Input() activationRequestId!: number;
  @Input() profile: AudienceProfile = new AudienceProfile();
  @Output() close = new EventEmitter<void>();

  newInterest: string = '';

  constructor(private requestService: ActivationRequestService) {}

  addInterest() {
    if (this.newInterest.trim() && !this.profile.interests.includes(this.newInterest)) {
      this.profile.interests.push(this.newInterest.trim());
      this.newInterest = '';
    }
  }

  removeInterest(index: number) {
    this.profile.interests.splice(index, 1);
  }

  handleSave() {
    this.requestService.addAudienceProfile(this.activationRequestId, this.profile).subscribe(() => {
      this.close.emit();
    });
  }

  handleCancel() {
    this.close.emit();
  }
}
