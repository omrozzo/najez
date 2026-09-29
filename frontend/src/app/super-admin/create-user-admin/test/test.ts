import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-test',
  imports: [CommonModule, RouterModule],
  templateUrl: './test.html',
  styleUrl: './test.css',
})
export class Test {
  message: string = 'هذا مكون تجريبي لفهم child routing';
}
