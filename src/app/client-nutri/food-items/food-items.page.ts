import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { clientItem } from '../clientItem.model';
import { CreateItemComponent } from './create-item/create-item.component';
import { FoodItemTableComponent } from './food-item-table/food-item-table.component';
import { FoodItemsService } from './food-items.service';

@Component({
  selector: 'app-food-items',
  templateUrl: './food-items.page.html',
  styleUrls: ['./food-items.page.scss'],
})
export class FoodItemsPage implements OnInit {
  form: FormGroup;
  constructor(
    private modalCtrl:ModalController,
    private foodItemservice: FoodItemsService,

  ) { }

  ngOnInit() {
    console.log("food items on init");
  }
  ionViewWillEnter(){
    console.log("ION ENTER FOODSITEMS");
    this.foodItemservice.fetch_itemsAlimentarios();
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
        console.log("confirmed");
      }
    })
  }
}
