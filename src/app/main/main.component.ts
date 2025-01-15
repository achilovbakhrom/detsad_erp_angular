import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone: false,

  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  items = Array.from({ length: 1000 }).fill(0);
}
