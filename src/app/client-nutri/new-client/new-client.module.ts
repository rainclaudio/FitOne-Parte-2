import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewClientPageRoutingModule } from './new-client-routing.module';

import { NewClientPage } from './new-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewClientPageRoutingModule
  ],
  declarations: [NewClientPage]
})
export class NewClientPageModule {}
