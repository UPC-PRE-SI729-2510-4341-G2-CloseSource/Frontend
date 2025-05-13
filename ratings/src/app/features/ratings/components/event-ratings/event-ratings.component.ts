import { Component, OnInit } from '@angular/core';
import { RatingService} from '../../../../services/rating.service';
import {NgForOf, SlicePipe} from '@angular/common';
//import { Rating } from '../../../../services/rating.service';



@Component({
  selector: 'app-event-ratings',
  templateUrl: './event-ratings.component.html',
  imports: [
    SlicePipe,
    NgForOf
  ],
  styleUrls: ['./event-ratings.component.css']
})
export class EventRatingsComponent implements OnInit {


  constructor(private ratingService: RatingService) {}

  ngOnInit(): void {
        throw new Error('Method not implemented.');
    }


}
