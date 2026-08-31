import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Brands } from '../brands/brands';


@Component({
  selector: 'app-products',
  imports: [Brands, RouterOutlet],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('Products component initialized');
  }

  goToBrands() {
    this.router.navigate(['omar/samer']);
  }
}
