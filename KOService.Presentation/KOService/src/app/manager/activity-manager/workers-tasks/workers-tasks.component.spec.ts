import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersTasksComponent } from './workers-tasks.component';

describe('WorkersTasksComponent', () => {
  let component: WorkersTasksComponent;
  let fixture: ComponentFixture<WorkersTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkersTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkersTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
