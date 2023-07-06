import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceDataHistoryComponent } from './reference-data-history.component';

describe('ReferenceDataHistoryComponent', () => {
  let component: ReferenceDataHistoryComponent;
  let fixture: ComponentFixture<ReferenceDataHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReferenceDataHistoryComponent]
    });
    fixture = TestBed.createComponent(ReferenceDataHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
