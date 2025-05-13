import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRatingsComponent } from './components/event-ratings/event-ratings.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EventRatingsComponent],
  imports: [CommonModule, FormsModule],
  exports: [EventRatingsComponent]
})
export class RatingsModule {}
