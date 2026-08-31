import { Routes } from '@angular/router';
import { Products } from './Mydashboard/products/products';
import { Brands } from './Mydashboard/brands/brands';


export const routes: Routes = [
  {
   path: '',
   redirectTo: 'products',
   pathMatch: 'full'
  },
  {
   path: 'products',
   component: Products
  },
{
   path: 'omar/samer',
   component: Brands
}

//   {
//   path: 'omar',
//   component: Products,
//   children: [
//     {
//       path: 'samer',
//       component: Brands
//     }
//   ]
// }

];
