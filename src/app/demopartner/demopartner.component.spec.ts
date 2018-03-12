import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemopartnerComponent } from './demopartner.component';

describe('DemopartnerComponent', () => {
  let component: DemopartnerComponent;
  let fixture: ComponentFixture<DemopartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemopartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemopartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
