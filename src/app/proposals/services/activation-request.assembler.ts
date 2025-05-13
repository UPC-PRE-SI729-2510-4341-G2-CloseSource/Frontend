import {ActivationRequest} from '../model/activation-request.entity';
import { EventFilter } from '../model/event-filter.entity';

export class ActivationRequestAssembler {
  static fromJson(json: any): ActivationRequest {
    const activationRequest = new ActivationRequest();

    activationRequest.request_id = json.request_id;
    activationRequest.company_id = json.company_id;
    activationRequest.event_title = json.event_title;
    activationRequest.event_description = json.event_description;
    activationRequest.location = json.location;
    activationRequest.start_date = json.start_date;
    activationRequest.end_date = json.end_date;
    activationRequest.status = json.status;

    // Mapear los event_filters
    activationRequest.event_filters = json.event_filters?.map((filter: any) => {
      const eventFilter = new EventFilter(
        filter.filter_id,
        filter.type,
        filter.filter_name
      );
      return eventFilter;
    }) || [];

    return activationRequest;
  }

  static toJson(activationRequest: ActivationRequest): any {
    return {
      request_id: activationRequest.request_id,
      company_id: activationRequest.company_id,
      event_title: activationRequest.event_title,
      event_description: activationRequest.event_description,
      location: activationRequest.location,
      start_date: activationRequest.start_date,
      end_date: activationRequest.end_date,
      status: activationRequest.status,
      event_filters: activationRequest.event_filters?.map(filter => ({
        filter_id: filter.filter_id,
        type: filter.type,
        filter_name: filter.filter_name
      }))
    };
  }

}
