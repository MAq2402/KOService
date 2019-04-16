import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairInfoComponent } from './repair-info.component';

describe('RepairInfoComponent', () => {
  let component: RepairInfoComponent;
  let fixture: ComponentFixture<RepairInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
