import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LogoutButtonComponent } from './logout-button.component';
import { SecurityService } from '../../services/security.service';

describe('LogoutButtonComponent', () => {
  let component: LogoutButtonComponent;
  let fixture: ComponentFixture<LogoutButtonComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSecurityService: jasmine.SpyObj<SecurityService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const securityServiceSpy = jasmine.createSpyObj('SecurityService', ['checkSecurity']);

    await TestBed.configureTestingModule({
      imports: [LogoutButtonComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: SecurityService, useValue: securityServiceSpy }
      ]
    }).compileComponents();

    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockSecurityService = TestBed.inject(SecurityService) as jasmine.SpyObj<SecurityService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout and navigate to login', () => {
    spyOn(localStorage, 'removeItem');
    
    component.onLogout();
    
    expect(localStorage.removeItem).toHaveBeenCalledWith('userSession');
    expect(localStorage.removeItem).toHaveBeenCalledWith('userRole');
    expect(localStorage.removeItem).toHaveBeenCalledWith('userId');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should check if user is logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue('test-session');
    
    const result = component.isLoggedIn();
    
    expect(result).toBeTruthy();
    expect(localStorage.getItem).toHaveBeenCalledWith('userSession');
  });
});