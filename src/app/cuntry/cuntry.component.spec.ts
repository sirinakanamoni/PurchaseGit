import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuntryComponent } from './cuntry.component';

describe('CuntryComponent', () => {
  let component: CuntryComponent;
  let fixture: ComponentFixture<CuntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
