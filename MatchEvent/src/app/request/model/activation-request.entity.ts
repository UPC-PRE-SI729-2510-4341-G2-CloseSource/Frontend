// request/model/activation-request.entity.ts

export class ActivationRequest {
  id: number = 0;
  title: string = '';
  description: string = '';
  companyId: { companyId: number } = { companyId: 0 };
  status: string = '';
  location?: ActivationLocation;
  materials: MaterialRequirement[] = [];
  eventDateRange?: EventDateRange;
  audienceProfiles: AudienceProfile[] = [];
}

export class ActivationLocation {
  address: string = '';
  coordinates: LocationCoordinates = { latitude: 0, longitude: 0 };
  capacity: number = 0;
  imageUrl: string = '';
}

export class LocationCoordinates {
  latitude: number = 0;
  longitude: number = 0;
}

export class MaterialRequirement {
  name: string = '';
  quantity: number = 0;
  specification: string = '';
  providedByCompany: boolean = false;
}

export class EventDateRange {
  startDate: string = '';
  endDate: string = '';
}

export class AudienceProfile {
  ageRange: string = '';
  genderTarget: string = '';
  interests: string[] = [];
}
