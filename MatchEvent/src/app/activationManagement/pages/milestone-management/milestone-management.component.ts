import { Component } from '@angular/core';
import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { MilestonesService} from '../../services/milestones.service';
import { Milestone} from '../../model/milestone.entity';
import { MilestoneCreateAndEditComponent} from '../../components/milestone-create-and-edit/milestone-create-and-edit.component';
import { NgClass } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-milestone-management',
  imports: [MatPaginator, MatSort, MatIconModule, MilestoneCreateAndEditComponent, MatTableModule, NgClass, TranslateModule],
  templateUrl: './milestone-management.component.html',
  standalone: true,
  styleUrl: './milestone-management.component.css'
})
export class MilestoneManagementComponent implements OnInit, AfterViewInit  {
  // Attributes
  milestoneData: Milestone;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [ 'id', 'activation_id', 'title', 'description', 'due_date', 'completion_date', 'status', 'actions'];
  isEditMode: boolean;

  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;

  // Constructor
  constructor(private milestoneService: MilestonesService) {
    this.isEditMode = false;
    this.milestoneData = {} as Milestone;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.milestoneData = {} as Milestone;
  }

  // CRUD Actions

  private getAllMilestones(): void {
    this.milestoneService.getAll()
      .subscribe((response: any) => {
        this.dataSource.data = response;
      });
  };

  private createMilestone(): void {
    this.milestoneService.create(this.milestoneData)
      .subscribe((response: any) => {
        this.dataSource.data.push({...response});
        // Actualiza el dataSource.data con los milestones actuales, para que Angular detecte el cambio y actualice la vista.
        this.dataSource.data = this.dataSource.data
          .map((milestone: Milestone) => {
            return milestone;
          });
      });
  };

  private updateMilestone(): void {
    let milestoneToUpdate: Milestone = this.milestoneData;
    this.milestoneService.update(this.milestoneData.id, milestoneToUpdate)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data
          .map((milestone: Milestone) => {
            if (milestone.id === response.id) {
              return response;
            }
            return milestone;
          });
      });
  };

  private deleteMilestone(milestoneId: number): void {
    this.milestoneService.delete(milestoneId)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data
          .filter((milestone: Milestone) => {
            return milestone.id !== milestoneId ? milestone : false;
          });
      });
  };

  // UI Event Handlers

  onEditItem(element: Milestone) {
    this.isEditMode = true;
    this.milestoneData = element;
  }

  onDeleteItem(element: Milestone) {
    this.deleteMilestone(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllMilestones();
  }

  onMilestoneAdded(element: Milestone) {
    this.milestoneData = element;
    this.createMilestone();
    this.resetEditState();
  }

  onMilestoneUpdated(element: Milestone) {
    this.milestoneData = element;
    this.updateMilestone();
    this.resetEditState();
  }

  // Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllMilestones();
  }

}
