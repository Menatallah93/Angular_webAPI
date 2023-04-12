import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectRegestrationComponent } from './redirect-regestration.component';

describe('RedirectRegestrationComponent', () => {
  let component: RedirectRegestrationComponent;
  let fixture: ComponentFixture<RedirectRegestrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectRegestrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirectRegestrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
