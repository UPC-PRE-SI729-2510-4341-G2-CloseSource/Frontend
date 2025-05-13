import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { Proposal } from '../../model/proposal.entity';
import { Service } from '../../model/service.entity';
import { ActivationRequest } from '../../model/activation-request.entity';

// proposal-details.component.ts
@Component({
  selector: 'app-proposal-details',
  templateUrl: './proposal-details.component.html',
  styleUrls: ['./proposal-details.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatStepperModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule
  ]
})
export class ProposalDetailsComponent {
  proposal: Proposal;
  service: Service;
  activationRequest: ActivationRequest;

  constructor(
    public dialogRef: MatDialogRef<ProposalDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      proposal: Proposal,
      service: Service,
      activationRequest: ActivationRequest
    }
  ) {
    this.proposal = data.proposal;
    this.service = data.service;
    this.activationRequest = data.activationRequest;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
