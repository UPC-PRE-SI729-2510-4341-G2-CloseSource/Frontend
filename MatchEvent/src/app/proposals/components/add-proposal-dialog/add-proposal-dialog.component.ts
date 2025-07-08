import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-add-proposal-dialog',
  standalone: true,
  templateUrl: './add-proposal-dialog.component.html',
  styleUrls: ['./add-proposal-dialog.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ]
})
export class AddProposalDialogComponent {
  proposal = {
    requestId: 0,
    producerId: 0,
    name: '',
    activationPlan: {
      objective: '',
      concept: '',
      branding: '',
      activation: '',
      resources: '',
      kpi: ''
    },
    offeredPrice: 0,
    submissionDate: new Date().toISOString(),
    proposalStatus: 'PENDING'
  };

  constructor(public dialogRef: MatDialogRef<AddProposalDialogComponent>) {}

  save() {
    this.dialogRef.close(this.proposal);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
