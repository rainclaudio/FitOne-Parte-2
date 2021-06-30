/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MedicionesService } from './mediciones.service';
import { clientItem } from './clientItem.model';
import { ClientsService } from './clients.service';

@Component({
  selector: 'app-client-nutri',
  templateUrl: './client-nutri.page.html',
  styleUrls: ['./client-nutri.page.scss'],
})
export class ClientNutriPage implements OnInit,OnDestroy {
  copyClientVector: clientItem[] = [];
  private clientSub: Subscription;
  constructor(private medicionesService: MedicionesService,private afsAuth: AngularFireAuth,
    private authservice: AuthService, private clientService: ClientsService) { }

  ngOnInit() {
    this.clientSub = this.clientService.Clientes.subscribe(clients => {
      this.copyClientVector = clients;
    });

  }
  ionViewWillEnter(){
    this.clientService.fetch_firebase('Cliente').subscribe();
  }
  ngOnDestroy(){
    if(this.clientSub){
      this.clientSub.unsubscribe();
    }
  }

  getVectorCopy(){
    return [...this.copyClientVector];
  }
  logout_function(){
    this.authservice.logout();
    // this.afsAuth.signOut();
  }
}
