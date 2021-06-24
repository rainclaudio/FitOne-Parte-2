import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { clientItem } from '../clientItem.model';
import { CreateItemComponent } from './create-item/create-item.component';

@Component({
  selector: 'app-food-items',
  templateUrl: './food-items.page.html',
  styleUrls: ['./food-items.page.scss'],
})
export class FoodItemsPage implements OnInit {
  form: FormGroup;
  constructor(
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {

  }
  CreateItem(){
    this.modalCtrl.
    create(
      {
        component: CreateItemComponent,
        componentProps:{
        }
      }
    ).then((modalEl) => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then((resultData) => {
      if(resultData.role === 'confirm'){

      }
    })
  }
}
