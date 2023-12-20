import { ComponentFixture, TestBed } from '@angular/core/testing';
  import { AuthComponent } from './auth.component';

import { MatIconModule } from '@angular/material/icon';  // Asegúrate de importar MatIconModule si lo estás utilizando

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [MatIconModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
