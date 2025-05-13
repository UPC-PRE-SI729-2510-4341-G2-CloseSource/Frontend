import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-page-not-found',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, TranslateModule],
  templateUrl: './page-not-found.component.html',
  standalone: true,
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {
  constructor(private router: Router) {}

  navegarAlDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
