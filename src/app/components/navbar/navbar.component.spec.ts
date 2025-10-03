import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter menu items by user role', () => {
    component.currentUser.rol = 'estudiante';
    const visibleItems = component.visibleMenuItems;
    expect(visibleItems.every(item => item.roles.includes('estudiante'))).toBeTruthy();
  });

  it('should toggle menu correctly', () => {
    expect(component.isMenuOpen).toBeFalsy();
    component.toggleMenu();
    expect(component.isMenuOpen).toBeTruthy();
    component.closeMenu();
    expect(component.isMenuOpen).toBeFalsy();
  });

  it('should detect active route correctly', () => {
    component.currentRoute = '/encuestas';
    expect(component.isActiveRoute('/encuestas')).toBeTruthy();
    expect(component.isActiveRoute('/login')).toBeFalsy();
  });

  it('should return correct role display name', () => {
    expect(component.getRoleDisplayName('estudiante')).toBe('Estudiante');
    expect(component.getRoleDisplayName('administrador')).toBe('Administrador');
  });
});