export class Service {
  service_id: number;
  producer_id: number;
  name: string;
  description: string;
  price: number;

  constructor() {
    this.service_id = 0;
    this.producer_id = 0;
    this.name = '';
    this.description = '';
    this.price = 0.0;
  }
}
