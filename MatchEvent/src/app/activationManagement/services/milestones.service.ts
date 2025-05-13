import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Milestone} from '../model/milestone.entity';

@Injectable({
  providedIn: 'root'
})
export class MilestonesService extends BaseService<Milestone>{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/milestones';
  }
}
