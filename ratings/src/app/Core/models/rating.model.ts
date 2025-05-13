export class Rating {
  constructor(
    public rating_id: number,
    public event_id: number,
    public issuer_id: number,
    public receiver_id: number,
    public score: number,
    public comment: string
  ) {}
}
export interface IRating {
  rating_id: number;
  event_id: number;
  issuer_id: number;
  receiver_id: number;
  score: number;
  comment: string;
}
