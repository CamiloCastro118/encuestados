// Herramientas basicas de Angular
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Componente principal de toda la aplicacion
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Nombre de la aplicacion
  title = 'encuestas-app';
}
