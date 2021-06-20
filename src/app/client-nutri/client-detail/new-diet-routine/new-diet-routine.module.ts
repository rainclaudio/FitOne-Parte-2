import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewDietRoutinePageRoutingModule } from './new-diet-routine-routing.module';

import { NewDietRoutinePage } from './new-diet-routine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewDietRoutinePageRoutingModule
  ],
  declarations: [NewDietRoutinePage]
})
export class NewDietRoutinePageModule {}
