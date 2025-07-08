import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Proposal } from '../../models/proposal.model';
import { ProposalService } from '../../services/proposal.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-proposal-dialog',
  templateUrl: './edit-proposal-dialog.component.html',
  styleUrls: ['./edit-proposal-dialog.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule],
  providers: [ProposalService]
})
export class EditProposalDialogComponent {
  proposal: Proposal;

  constructor(
    public dialogRef: MatDialogRef<EditProposalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Proposal,
    private proposalService: ProposalService
  ) {
    this.proposal = {
      ...data,
      activationPlan: { ...(data.activationPlan ?? {
          objective: '',
          concept: '',
          branding: '',
          activation: '',
          resources: '',
          kpi: ''
        }) }
    };
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    console.log('Proposal a enviar:', JSON.stringify(this.proposal, null, 2));
    this.proposalService.update(this.proposal.proposalId!, this.proposal).subscribe({
      next: (updated) => this.dialogRef.close(updated),
      error: (err) => console.error('Error actualizando propuesta:', err)
    });
  }
}
