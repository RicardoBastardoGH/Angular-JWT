import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniyCrudComponent } from './companiy-crud.component';

describe('CompaniyCrudComponent', () => {
  let component: CompaniyCrudComponent;
  let fixture: ComponentFixture<CompaniyCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniyCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniyCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
