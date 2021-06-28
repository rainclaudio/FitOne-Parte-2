import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewDietRoutinePageRoutingModule } from './new-diet-routine-routing.module';

import { NewDietRoutinePage } from './new-diet-routine.page';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    IonicModule,
    NewDietRoutinePageRoutingModule
  ],
  declarations: [NewDietRoutinePage]
})
export class NewDietRoutinePageModule {}
