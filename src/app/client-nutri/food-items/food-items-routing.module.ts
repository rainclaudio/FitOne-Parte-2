import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodItemsPage } from './food-items.page';

const routes: Routes = [
  {
    path: '',
    component: FoodItemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodItemsPageRoutingModule {}
