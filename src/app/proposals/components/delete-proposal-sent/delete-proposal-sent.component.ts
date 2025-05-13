import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Proposal } from '../../model/proposal.entity';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './delete-proposal-sent.component.html',
  styleUrl: './delete-proposal-sent.component.css',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TranslateModule
  ]
})
export class DeleteProposalSentComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteProposalSentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { proposal: Proposal }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}



