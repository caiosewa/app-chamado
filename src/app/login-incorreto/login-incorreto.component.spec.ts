import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginIncorretoComponent } from './login-incorreto.component';

describe('LoginIncorretoComponent', () => {
  let component: LoginIncorretoComponent;
  let fixture: ComponentFixture<LoginIncorretoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginIncorretoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginIncorretoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
