import { Component } from '@angular/core';
import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Milestone} from '../../model/milestone.entity';
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-milestone-create-and-edit',
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './milestone-create-and-edit.component.html',
  standalone: true,
  styleUrl: './milestone-create-and-edit.component.css'
})
export class MilestoneCreateAndEditComponent {
  // Attributes
  @Input() milestone: Milestone;
  @Input() editMode: boolean = false;
  @Output() milestoneAdded: EventEmitter<Milestone> = new EventEmitter<Milestone>();
  @Output() milestoneUpdated: EventEmitter<Milestone> = new EventEmitter<Milestone>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('milestoneForm', {static: false}) milestoneForm!: NgForm;

  // Methods
  constructor() {
    this.milestone = {} as Milestone;
  }

  // Private methods
  private resetEditState(): void {
    this.milestone = {} as Milestone;
    this.editMode = false;
    this.milestoneForm.resetForm();
  }

  // Event Handlers

  onSubmit(): void {
    if (this.milestoneForm.form.valid) {
      let emitter: EventEmitter<Milestone> = this.editMode ? this.milestoneUpdated : this.milestoneAdded;
      emitter.emit(this.milestone);
      this.resetEditState();
    } else {
      console.error('Invalid data in form');
    }
  }

  onCancel(): void {
    this.editCanceled.emit();
    this.resetEditState();
  }
}
