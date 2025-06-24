export interface GalleryItem {
  imageUrl: string;
  caption: string;
}

export enum EventStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED'
}

export interface Event {
  id: number;
  proposalId: number;
  startDate: string;   // ISO
  endDate: string;
  status: EventStatus;
  description: string;
  location: string;
  gallery: GalleryItem[];
}