import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientDetailPage } from './client-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ClientDetailPage
  },
  {
    path: 'evaluation-detail',
    loadChildren: () => import('./evaluation-detail/evaluation-detail.module').then( m => m.EvaluationDetailPageModule)
  },
  {
    path: 'new-diet-routine',
    loadChildren: () => import('./new-diet-routine/new-diet-routine.module').then( m => m.NewDietRoutinePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientDetailPageRoutingModule {}
