import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniyCreateComponent } from './companiy-create.component';

describe('CompaniyCreateComponent', () => {
  let component: CompaniyCreateComponent;
  let fixture: ComponentFixture<CompaniyCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniyCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
