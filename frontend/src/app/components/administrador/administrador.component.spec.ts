import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorComponent } from './administrador.component';

describe('AdministradorComponent', () => {
  let component: AdministradorComponent;
  let fixture: ComponentFixture<AdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial data on init', () => {
    component.ngOnInit();
    expect(component.usuarios.length).toBeGreaterThan(0);
    expect(component.encuestas.length).toBeGreaterThan(0);
  });

  it('should change view correctly', () => {
    component.cambiarVista('usuarios');
    expect(component.vistaActual).toBe('usuarios');
  });

  it('should filter users correctly', () => {
    component.ngOnInit();
    component.filtroUsuarios = 'juan';
    const filtered = component.usuariosFiltrados;
    expect(filtered.every(u => u.nombre.toLowerCase().includes('juan'))).toBeTruthy();
  });
});