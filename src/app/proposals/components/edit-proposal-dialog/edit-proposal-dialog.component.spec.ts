import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProposalDialogComponent } from './edit-proposal-dialog.component';

describe('EditProposalDialogComponent', () => {
  let component: EditProposalDialogComponent;
  let fixture: ComponentFixture<EditProposalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProposalDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProposalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
