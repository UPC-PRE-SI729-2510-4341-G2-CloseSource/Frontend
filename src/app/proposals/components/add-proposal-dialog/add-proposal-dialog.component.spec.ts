import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProposalDialogComponent } from './add-proposal-dialog.component';

describe('AddProposalDialogComponent', () => {
  let component: AddProposalDialogComponent;
  let fixture: ComponentFixture<AddProposalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProposalDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProposalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
