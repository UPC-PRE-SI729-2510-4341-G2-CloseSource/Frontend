import { Component, OnInit } from '@angular/core';
import { Proposal } from '../../models/proposal.model'; // Ajusta ruta según tu proyecto
import { ProposalService } from '../../services/proposal.service'
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import { FilterByNamePipe } from '../../../shared/pipes/filter-by-name.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component'; // Ajusta la ruta
import { AddProposalDialogComponent } from '../add-proposal-dialog/add-proposal-dialog.component';
import { EditProposalDialogComponent } from '../edit-proposal-dialog/edit-proposal-dialog.component';
import { ProposalDetailsDialogComponent } from '../proposal-details-dialog/proposal-details-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    FilterByNamePipe,
    TranslateModule
  ],
  providers: [ProposalService]

})
export class ProposalListComponent implements OnInit {
  proposals: Proposal[] = [];
  totalProposals: number = 0;
  approvedProposals: number = 0;
  filterName: string = '';

  constructor(
    private proposalService: ProposalService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProposals();
  }

  loadProposals() {
    this.proposalService.getAll().subscribe({
      next: (data) => {
        console.log('📦 Proposals desde backend:', data); // <- AGREGA ESTO
        this.proposals = data;
        this.totalProposals = data.length;
        // @ts-ignore
        this.approvedProposals = data.filter(p => p.proposalStatus === 'ACCEPTED').length;
      },
      error: (err) => console.error('Error cargando proposals', err)
    });
  }

  onEdit(proposal: Proposal) {
    const dialogRef = this.dialog.open(EditProposalDialogComponent, {
      width: '500px',
      data: proposal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Actualiza lista si es necesario
        this.loadProposals();
      }
    });
  }

  onDelete(proposal: Proposal) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '350px',
      data: { proposal }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.proposalService.delete(proposal.proposalId).subscribe({
          next: () => {
            this.proposals = this.proposals.filter(p => p.proposalId !== proposal.proposalId);
          },
          error: (err) => console.error('Error al eliminar proposal', err)
        });
      }
    });
  }

  openDetails(proposal: Proposal): void {
    this.dialog.open(ProposalDetailsDialogComponent, {
      width: '500px',
      data: proposal
    });
  }

  openAddProposalDialog() {
    const dialogRef = this.dialog.open(AddProposalDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.proposalService.create(result).subscribe({
          next: (newProposal) => {
            this.proposals.push(newProposal);
            this.totalProposals++;
          },
          error: (err) => console.error('Error al crear proposal', err)
        });
      }
    });
  }

  get filteredProposals(): Proposal[] {
    if (!this.filterName.trim()) return this.proposals;
    return this.proposals.filter(p =>
      p.name.toLowerCase().includes(this.filterName.toLowerCase())
    );
  }

}
