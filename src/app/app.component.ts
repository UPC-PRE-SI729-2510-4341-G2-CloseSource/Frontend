import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProposalListComponent } from "./proposals/components/proposal-list/proposal-list.component";
import { TranslateService } from "@ngx-translate/core";
import { HeaderContentComponent } from './public/components/header-content/header-content.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProposalListComponent, HeaderContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proposal-context';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
