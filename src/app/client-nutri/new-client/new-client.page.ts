import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.page.html',
  styleUrls: ['./new-client.page.scss'],
})
export class NewClientPage implements OnInit {
  formNewClient: FormGroup;

  constructor(private clientService: ClientsService,
     private navCtrl: NavController) { }
  createFormControl() {
    return new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required],
    });
  }
  ngOnInit() {
    this.formNewClient = new FormGroup({
      nombres: this.createFormControl(),
      apellidos: this.createFormControl(),
      genero: this.createFormControl(),
      edad: this.createFormControl(),
      telefono: this.createFormControl(),
      correo_electronico: this.createFormControl(),
      ocupacion: this.createFormControl(),
    });
  }
  onCreateClient() {
    if (
      !this.formNewClient.valid
    ) {
      return;
    }

     this.clientService.add_toFirestore(
      {
       id:  'borrable',
       nombres: this.formNewClient.value.nombres,
       apellidos:  this.formNewClient.value.apellidos,
       genero:  this.formNewClient.value.genero,
       edad:  this.formNewClient.value.edad,
       telefono:  this.formNewClient.value.telefono,
       correo_electronico:  this.formNewClient.value.correo_electronico,
       ocupacion:  this.formNewClient.value.ocupacion,
       id_nutri: 'borrable'
      },
      {
        nombres: this.formNewClient.value.nombres,
        apellidos:  this.formNewClient.value.apellidos,
        genero:  this.formNewClient.value.genero,
        edad:  this.formNewClient.value.edad,
        telefono:  this.formNewClient.value.telefono,
        correo_electronico:  this.formNewClient.value.correo_electronico,
        ocupacion:  this.formNewClient.value.ocupacion,
        id_nutri: 'borrable'
      },
      'Cliente',
      true
    ).subscribe( () => {
      this.navCtrl.navigateBack('client-nutri/tabs');
    })
    // this.resetForms();
  }
}
