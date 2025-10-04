// Herramientas para probar el menu de navegacion
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';

// Pruebas del menu de navegacion
describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    // Preparar todo para hacer las pruebas
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterTestingModule]
    })
    .compileComponents();
    
    // Crear el menu para probarlo
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Probar que el menu se crea bien
    expect(component).toBeTruthy();
  });

  it('should filter menu items by user role', () => {
    // Probar que solo se muestran las opciones correctas para cada usuario
    component.currentUser.rol = 'encuestado';
    const visibleItems = component.visibleMenuItems;
    expect(visibleItems.every(item => item.roles.includes('encuestado'))).toBeTruthy();
  });

  it('should toggle menu correctly', () => {
    // Probar que el menu se abre y cierra bien
    expect(component.isMenuOpen).toBeFalsy();
    component.toggleMenu();
    expect(component.isMenuOpen).toBeTruthy();
    component.closeMenu();
    expect(component.isMenuOpen).toBeFalsy();
  });

  it('should detect active route correctly', () => {
    // Probar que sabe en que pagina estamos
    component.currentRoute = '/encuestas';
    expect(component.isActiveRoute('/encuestas')).toBeTruthy();
    expect(component.isActiveRoute('/login')).toBeFalsy();
  });

  it('should return correct role display name', () => {
    // Probar que muestra los nombres de usuario correctos
    expect(component.getRoleDisplayName('encuestado')).toBe('Encuestado');
    expect(component.getRoleDisplayName('administrador')).toBe('Administrador');
  });
});