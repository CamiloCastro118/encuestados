import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DirectivoComponent } from './directivo.component';

describe('DirectivoComponent', () => {
  let component: DirectivoComponent;
  let fixture: ComponentFixture<DirectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectivoComponent, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DirectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load reportes on init', () => {
    component.ngOnInit();
    expect(component.reportes.length).toBeGreaterThan(0);
  });

  it('should change view correctly', () => {
    component.cambiarVista('reportes');
    expect(component.vistaActual).toBe('reportes');
  });

  it('should select and close reporte', () => {
    component.ngOnInit();
    const reporte = component.reportes[0];
    component.verReporte(reporte);
    expect(component.reporteSeleccionado).toBe(reporte);
    
    component.cerrarReporte();
    expect(component.reporteSeleccionado).toBeNull();
  });

  it('should return correct satisfaction color', () => {
    expect(component.obtenerColorSatisfaccion(85)).toBe('alta');
    expect(component.obtenerColorSatisfaccion(75)).toBe('media');
    expect(component.obtenerColorSatisfaccion(65)).toBe('baja');
  });
});