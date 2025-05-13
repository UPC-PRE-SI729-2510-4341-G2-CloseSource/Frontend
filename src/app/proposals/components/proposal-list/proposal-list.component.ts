import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';  // Añade MatTableDataSource aquí
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { ProposalDetailsComponent } from '../proposal-details/proposal-details.component';
import { MatcheventApiService } from '../../services/matchevent-api.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Proposal } from "../../model/proposal.entity";
import { RouterModule } from '@angular/router';
import { ProposalSentEditComponent } from '../proposal-sent-edit/proposal-sent-edit.component';
import { DeleteProposalSentComponent } from '../delete-proposal-sent/delete-proposal-sent.component';
import { Service } from '../../model/service.entity';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    RouterModule,
    MatTooltipModule
  ]
})
export class ProposalListComponent implements OnInit {
  proposals: Array<Proposal & { serviceName?: string, eventTitle?: string }> = [];
  services: Array<Service> = [];
  displayedColumns: string[] = [
    'ID',
    'AssociatedRequest',
    'OfferedService',
    'OfferedPrice',
    'ShippingDate',
    'Status',
    'Actions'
  ];
  dataSource: MatTableDataSource<Proposal & { serviceName?: string, eventTitle?: string }>;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private matcheventApiService: MatcheventApiService
  ) {
    this.dataSource = new MatTableDataSource<Proposal & { serviceName?: string, eventTitle?: string }>([]);
  }

  ngOnInit(): void {
    console.log('Iniciando carga de datos...');
    forkJoin({
      proposals: this.matcheventApiService.getProposals(),
      services: this.matcheventApiService.getAllServices(),
      activationRequests: this.matcheventApiService.getActivationRequests()
    }).subscribe({
      next: ({proposals, services, activationRequests}) => {
        console.log('Datos recibidos:', { proposals, services, activationRequests });
        this.services = services;
        this.proposals = proposals.map(proposal => ({
          ...proposal,
          serviceName: services.find(service => service.service_id === proposal.service_id)?.name || 'Servicio no encontrado',
          eventTitle: activationRequests.find(request => request.request_id === proposal.request_id)?.event_title || 'Evento no encontrado'
        }));
        this.dataSource.data = this.proposals;
      },
      error: (error) => {
        console.error('Error detallado al cargar los datos:', error);
        this.snackBar.open('Error al cargar los datos: ' + error.message, 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
    });
  }


  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'status-approved';
      case 'rejected':
        return 'status-denied';
      case 'pending':
        return 'status-pending';
      default:
        return '';
    }
  }

  getStatusText(status: string): string {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'Aprobado';
      case 'rejected':
        return 'Denegado';
      case 'pending':
        return 'Pendiente';
      default:
        return status;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openProposalForm(proposal?: Proposal) {
    const dialogRef = this.dialog.open(ProposalSentEditComponent, {
      width: 'auto',
      height: '80%',
      data: proposal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.data.findIndex(p => p.proposal_id === result.proposal_id);
        if (index !== -1) {
          const updatedData = [...this.dataSource.data];
          updatedData[index] = { ...result, eventTitle: this.dataSource.data[index].eventTitle };
          this.dataSource.data = updatedData;
        }
        this.matcheventApiService.updateProposal(result).subscribe({
          next: () => {
            this.ngOnInit();
          },
          error: (error: Error) => {
            console.error('Error al actualizar la propuesta:', error);
          }
        });
      }
    });
  }

  openDeleteDialog(proposal: Proposal): void {
    const dialogRef = this.dialog.open(DeleteProposalSentComponent, {
      data: { proposal },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(`Iniciando eliminación de propuesta ID: ${proposal.proposal_id}`);
        this.matcheventApiService.deleteProposal(proposal.proposal_id).subscribe({
          next: () => {
            console.log(`Propuesta ${proposal.proposal_id} eliminada exitosamente`);
            this.proposals = this.proposals.filter(p => p.proposal_id !== proposal.proposal_id);
            this.dataSource.data = this.proposals;
            this.snackBar.open('Propuesta eliminada con éxito', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          },
          error: (error: any) => {
            console.error('Error detallado al eliminar la propuesta:', {
              proposal: proposal.proposal_id,
              error: error
            });
            let errorMessage = 'Error al eliminar la propuesta';
            if (error.status === 404) {
              errorMessage = 'No se encontró la propuesta para eliminar';
            }
            this.snackBar.open(errorMessage, 'Cerrar', {
              duration: 5000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });

            // Recargar la lista para asegurar consistencia
            this.ngOnInit();
          }
        });
      }
    });
  }

  viewDetails(element: Proposal): void {
    forkJoin({
      service: this.matcheventApiService.getServiceById(element.service_id),
      activationRequest: this.matcheventApiService.getActivationRequestById(element.request_id)
    }).subscribe({
      next: ({ service, activationRequest }) => {
        this.dialog.open(ProposalDetailsComponent, {
          width: '800px',
          data: {
            proposal: element,
            service: service,
            activationRequest: activationRequest
          }
        });
      },
      error: (error) => {
        console.error('Error al cargar los detalles:', error);
        this.snackBar.open('Error al cargar los detalles', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
    });
  }
}
