import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProposalListComponent} from './proposals/components/proposal-list/proposal-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProposalListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proposal-context-frontend';
}
