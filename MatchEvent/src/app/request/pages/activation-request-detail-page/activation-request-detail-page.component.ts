// request/pages/activation-request-detail-page/activation-request-detail-page.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { TranslatePipe } from '@ngx-translate/core';

import { ActivationRequestService } from '../../services/activation-request.service';
import { ActivationRequest } from '../../model/activation-request.entity';

import { ActivationRequestLocationFormComponent } from '../../components/activation-request-location-form/activation-request-location-form.component';
import { ActivationRequestMaterialFormComponent } from '../../components/activation-request-material-form/activation-request-material-form.component';
import { ActivationRequestEventDateFormComponent } from '../../components/activation-request-event-date-form/activation-request-event-date-form.component';
import { ActivationRequestAudienceProfileFormComponent } from '../../components/activation-request-audience-profile-form/activation-request-audience-profile-form.component';

@Component({
  selector: 'app-activation-request-detail-page',
  standalone: true,
  templateUrl: './activation-request-detail-page.component.html',
  styleUrls: ['./activation-request-detail-page.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDivider,
    TranslatePipe,
    ActivationRequestLocationFormComponent,
    ActivationRequestMaterialFormComponent,
    ActivationRequestEventDateFormComponent,
    ActivationRequestAudienceProfileFormComponent
  ]
})
export class ActivationRequestDetailPageComponent implements OnInit {
  private requestService = inject(ActivationRequestService);
  private route = inject(ActivatedRoute);

  request?: ActivationRequest;
  materialDisplayedColumns: string[] = ['name', 'quantity', 'specification', 'providedByCompany'];

  showLocationForm = false;
  showMaterialForm = false;
  showEventDateForm = false;
  showAudienceProfileForm = false;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.requestService.getById(id).subscribe(data => {
      this.request = data;
    });
  }

  toggleLocationForm() {
    this.showLocationForm = !this.showLocationForm;
  }

  toggleMaterialForm() {
    this.showMaterialForm = !this.showMaterialForm;
  }

  toggleEventDateForm() {
    this.showEventDateForm = !this.showEventDateForm;
  }

  toggleAudienceProfileForm() {
    this.showAudienceProfileForm = !this.showAudienceProfileForm;
  }
}
