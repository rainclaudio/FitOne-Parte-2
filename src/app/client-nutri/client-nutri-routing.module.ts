import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewEvaluationPageModule } from './client-detail/new-evaluation/new-evaluation.module';
import { NewEvaluationPage } from './client-detail/new-evaluation/new-evaluation.page';

import { ClientNutriPage } from './client-nutri.page';

const routes: Routes = [
  {
    path: 'tabs',
    children: [

      {
        path:'new-client',
        loadChildren: () => import('./new-client/new-client.module').then(m => m.NewClientPageModule)
      },
      {
        path: 'client-detail',
        children: [
          {
            path: ':id_client',
            loadChildren: () => import('./client-detail/client-detail.module').then(m => m.ClientDetailPageModule)
          },
          {
            path: 'new-evaluation/:id_client',
            loadChildren: () => import('./client-detail/new-evaluation/new-evaluation.module').then(m => m.NewEvaluationPageModule)
          },
          {
            path: 'new-diet-routine/:id_client',
            loadChildren: () => import ('./client-detail/new-diet-routine/new-diet-routine.module').then(m => m.NewDietRoutinePageModule)
          }
        ]
      },
      {
        path: '',
        component: ClientNutriPage,
        pathMatch:'full'
      }
    ]
  },
  {
    path: '',
    redirectTo:'/client-nutri/tabs',
    pathMatch: 'full'
  },
  {
    path: 'food-items',
    loadChildren: () => import('./food-items/food-items.module').then( m => m.FoodItemsPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientNutriPageRoutingModule {}
