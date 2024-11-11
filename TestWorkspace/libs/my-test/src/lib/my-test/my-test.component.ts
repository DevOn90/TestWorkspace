import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-my-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-test.component.html',
  styleUrl: './my-test.component.css',
})
export class MyTestComponent {}
