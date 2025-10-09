import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="logout-btn-floating"
      (click)="logout()"
      *ngIf="isAuthenticated()"
      title="Cerrar Sesión">
      <span class="logout-icon">🚪</span>
      <span class="logout-text">Salir</span>
    </button>
  `,
  styles: [`
    .logout-btn-floating {
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #dc3545, #c82333);
      color: white;
      border: none;
      border-radius: 50px;
      padding: 12px 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
    }

    .logout-btn-floating:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(220, 53, 69, 0.4);
      background: linear-gradient(135deg, #c82333, #bd2130);
    }

    .logout-btn-floating:active {
      transform: translateY(0);
    }

    .logout-icon {
      font-size: 16px;
    }

    .logout-text {
      font-size: 13px;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .logout-btn-floating {
        top: 15px;
        right: 15px;
        padding: 10px 16px;
      }
      
      .logout-text {
        display: none;
      }
    }

    @media (max-width: 480px) {
      .logout-btn-floating {
        padding: 10px;
        border-radius: 50%;
        width: 44px;
        height: 44px;
        justify-content: center;
      }
    }
  `]
})
export class LogoutButtonComponent {
  
  constructor(
    private router: Router,
    private securityService: SecurityService
  ) {}

  logout(): void {
    console.log('Cerrando sesión...');
    this.securityService.logout();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.securityService.isAuthenticated();
  }
}