import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ActivationRequestService } from '../../services/activation-request.service';
import { ActivationRequest } from '../../model/activation-request.entity';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-available-requests-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, TranslatePipe],
  templateUrl: './available-requests-page.component.html',
  styleUrls: ['./available-requests-page.component.css']
})
export class AvailableRequestsPageComponent implements OnInit {
  private requestService = inject(ActivationRequestService);
  activationRequests: ActivationRequest[] = [];

  ngOnInit(): void {
    this.requestService.getAll().subscribe(data => {
      this.activationRequests = data;
    });
  }

  deleteRequest(id: number): void {
    this.requestService.delete(id).subscribe(() => {
      this.activationRequests = this.activationRequests.filter(r => r.id !== id);
    });
  }
}
