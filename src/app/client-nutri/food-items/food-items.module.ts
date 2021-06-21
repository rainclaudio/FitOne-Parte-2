import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodItemsPageRoutingModule } from './food-items-routing.module';

import { FoodItemsPage } from './food-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodItemsPageRoutingModule
  ],
  declarations: [FoodItemsPage]
})
export class FoodItemsPageModule {}
