import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewDietRoutinePage } from './new-diet-routine.page';

const routes: Routes = [
  {
    path: '',
    component: NewDietRoutinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewDietRoutinePageRoutingModule {}
