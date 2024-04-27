import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTaskDialogComponent } from './addEditTaskDialog.component';

describe('DialogComponent', () => {
  let component: AddEditTaskDialogComponent;
  let fixture: ComponentFixture<AddEditTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditTaskDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
