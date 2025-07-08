import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Proposal } from '../../models/proposal.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-proposal-details-dialog',
  templateUrl: './proposal-details-dialog.component.html',
  styleUrls: ['./proposal-details-dialog.component.css'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class ProposalDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public proposal: Proposal) {}
}
