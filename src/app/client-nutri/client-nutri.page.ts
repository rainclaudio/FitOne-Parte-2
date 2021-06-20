/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MedicionesService } from './mediciones.service';
import { clientItem } from './clientItem.model';

@Component({
  selector: 'app-client-nutri',
  templateUrl: './client-nutri.page.html',
  styleUrls: ['./client-nutri.page.scss'],
})
export class ClientNutriPage implements OnInit {
  copyClientVector: clientItem[] = [];
  private clientSub: Subscription;
  constructor(private medicionesService: MedicionesService,private afsAuth: AngularFireAuth,
    private authservice: AuthService) { }

  ngOnInit() {
    this.clientSub = this.medicionesService.clients.subscribe(clients => {
      this.copyClientVector = clients;
    });
  }


  getVectorCopy(){
    return [...this.copyClientVector];
  }
  logout_function(){
    this.authservice.logout();
    // this.afsAuth.signOut();
  }
}
