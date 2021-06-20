import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MedicionesService } from '../../mediciones.service';
import { clientItem } from '../../clientItem.model';

@Component({
  selector: 'app-new-diet-routine',
  templateUrl: './new-diet-routine.page.html',
  styleUrls: ['./new-diet-routine.page.scss'],
})
export class NewDietRoutinePage implements OnInit {
  private id_client: string;
  private clientSub: Subscription;
  private clientItem: clientItem;

  private macroCarboPercent: number;
  private macroProteinPercent: number;
  private macroFatPercent: number;

  private macroCarboGram: number;
  private macroProteinGram: number;
  private macroFatGram: number;

  private totalCalories: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navController: NavController,
    private medicionesService: MedicionesService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.totalCalories = 2200;
    this.macroCarboPercent = 50;
    this.macroFatPercent = 15;
    this.macroProteinPercent = 35;
    this.macroCarboGram =
     Math.round( ((this.totalCalories * this.macroCarboPercent) / 100) / 4);
    this.macroProteinGram =
      Math.round(((this.totalCalories * this.macroProteinPercent) / 100) / 4);
    this.macroFatGram =
      Math.round(((this.totalCalories * this.macroFatPercent) / 100) / 9);

    this.route.paramMap.subscribe((pmap) => {
      if (!pmap.has('id_client')) {
        this.navController.navigateBack('client-nutri/tabs');
        return;
      }
      this.id_client = pmap.get('id_client');
      console.log(this.id_client);
      this.clientSub = this.medicionesService
        .getClient(this.id_client)
        .subscribe((client) => {
          this.clientItem = client;
        });
    });
  }
  carbosChangeSlider(event: any) {
    // console.log("holis");
    this.macroCarboPercent = event.detail.value;
    this.macroCarboGram =
    Math.round(((this.totalCalories * this.macroCarboPercent) / 100) / 4);

    console.log(event.detail.value);
  }
  proteinChangeSlider(event: any) {
    this.macroProteinPercent = event.detail.value;
    this.macroProteinGram =
    Math.round(((this.totalCalories * this.macroProteinPercent) / 100) / 4);

    console.log(event.detail.value);
  }
  fatChangeSlider(event: any) {
    this.macroFatPercent = event.detail.value;
    this.macroFatGram =
    Math.round(((this.totalCalories * this.macroFatPercent) / 100) / 9);
    console.log(event.detail.value);
  }
  get gmacroCarboPercent() {
    return this.macroCarboPercent;
  }
  get gmacroProteinPercent() {
    return this.macroProteinPercent;
  }
  get gmacroFatPercent() {
    return this.macroFatPercent;
  }
  get gmacroCarboGram() {
    return this.macroCarboGram;
  }
  get gmacroProteinGram() {
    return this.macroProteinGram;
  }
  get gmacroFatGram() {
    return this.macroFatGram;
  }
  get gtotalPercent(){
    return this.macroFatPercent + this.macroProteinPercent + this.macroCarboPercent;
  }
}
