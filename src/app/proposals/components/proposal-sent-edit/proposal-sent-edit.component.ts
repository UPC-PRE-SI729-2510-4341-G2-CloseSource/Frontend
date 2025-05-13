import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Proposal } from '../../model/proposal.entity';
import { TranslateModule } from '@ngx-translate/core';
import { MatcheventApiService } from '../../services/matchevent-api.service';
import { forkJoin } from 'rxjs';
import { Service } from '../../model/service.entity';
import { ActivationRequest } from '../../model/activation-request.entity';

@Component({
  selector: 'app-proposal-sent-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './proposal-sent-edit.component.html',
  styleUrl: './proposal-sent-edit.component.css'
})
export class ProposalSentEditComponent implements OnInit {
  proposalForm: FormGroup;
  services: Service[] = [];
  activationRequests: ActivationRequest[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProposalSentEditComponent>,
    private matcheventApiService: MatcheventApiService,
    @Inject(MAT_DIALOG_DATA) public data: Proposal
  ) {
    this.proposalForm = this.fb.group({
      description: ['', Validators.required],
      offeredPrice: ['', Validators.required],
      requestId: ['', Validators.required],
      serviceId: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Obtener servicios y solicitudes
    forkJoin({
      services: this.matcheventApiService.getAllServices(),
      activationRequests: this.matcheventApiService.getActivationRequests()
    }).subscribe({
      next: ({ services, activationRequests }) => {
        this.services = services;
        this.activationRequests = activationRequests;

        if (this.data) {
          // Encontrar el servicio y la solicitud correspondientes
          const service = this.services.find(s => s.service_id === this.data.service_id);
          const request = this.activationRequests.find(r => r.request_id === this.data.request_id);

          this.proposalForm.patchValue({
            description: this.data.description,
            offeredPrice: this.data.offered_price.toString(),
            requestId: request?.event_title || this.data.request_id.toString(),
            serviceId: service?.name || this.data.service_id.toString()
          });
        }
      },
      error: (error) => {
        console.error('Error al cargar los datos:', error);
      }
    });
  }

  onSubmit() {
    if (this.proposalForm.valid) {
      const updatedProposal = {
        ...this.data,
        description: this.proposalForm.value.description,
        offered_price: this.proposalForm.value.offeredPrice,
        request_id: this.data.request_id,
        service_id: this.data.service_id,
        proposal_id: this.data ? this.data.proposal_id : 0,
        submission_date: this.data ? this.data.submission_date : new Date().toISOString(),
        proposal_status: this.data ? this.data.proposal_status : 'pending',
        serviceName: this.proposalForm.value.serviceId,
        eventTitle: this.proposalForm.value.requestId
      };
      this.dialogRef.close(updatedProposal);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
