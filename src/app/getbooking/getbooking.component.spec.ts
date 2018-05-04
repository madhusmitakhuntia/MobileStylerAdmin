import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetbookingComponent } from './getbooking.component';

describe('GetbookingComponent', () => {
  let component: GetbookingComponent;
  let fixture: ComponentFixture<GetbookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetbookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
