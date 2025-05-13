export class Milestone {
  id: number;
  activation_id: number;
  title: string;
  description: string;
  due_date: string;
  completion_date: string;
  status: string;

  constructor() {
    this.id = 0;
    this.activation_id = 0;
    this.title = '';
    this.description = '';
    this.due_date = '';
    this.completion_date = '';
    this.status = '';
  }
}

