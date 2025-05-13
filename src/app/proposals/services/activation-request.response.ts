export interface ActivationRequestResponse {
  request_id: number;
  company_id: number;
  event_title: string;
  event_description: string;
  location: string;
  start_date: string;
  end_date: string;
  status: string;
  event_filters: EventFilter[];
}

interface EventFilter {
  filter_id: number;
  type: string;
  filter_name: string;
}
