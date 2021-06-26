import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodItemsPage } from './food-items.page';

const routes: Routes = [
  {
    path: '',
    component: FoodItemsPage
  },
  {
    path: 'crear-item',
    loadChildren: () => import('./crear-item/crear-item.module').then( m => m.CrearItemPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodItemsPageRoutingModule {}
