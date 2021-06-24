import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodItemsPageRoutingModule } from './food-items-routing.module';

import { FoodItemsPage } from './food-items.page';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FoodItemTableComponent } from './food-item-table/food-item-table.component';
import { CreateItemComponent } from './create-item/create-item.component';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FoodItemsPageRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  declarations: [FoodItemsPage,FoodItemTableComponent,CreateItemComponent ],
  entryComponents:[CreateItemComponent]
})
export class FoodItemsPageModule {}
