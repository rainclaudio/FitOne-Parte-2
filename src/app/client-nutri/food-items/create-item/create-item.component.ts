import { Component, OnInit,ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Categoria, DescripcionComun } from '../../nutricionPlan.model';
import { FoodItemsService } from '../food-items.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent implements OnInit {
  customActionSheetOptions: any = {
    header: 'Descripcion',
    subHeader: 'Seleccione una descripcion'
  };

  formcreateItem: FormGroup;

  formPorciones: FormGroup;

  formCategorias: FormGroup;


  private descripcionVectro: DescripcionComun[] = [];
  private descripcionSub: Subscription;
  isFirstDescripcion: boolean = true;
  isFirstCategoria: boolean = true;

  private categoriaVector: Categoria[] = [];
  private categoriaSub: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private foodItemService: FoodItemsService
  ) { }
  createFormControl() {
    return new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required],
    });
  }
  ngOnInit() {

    this.descripcionSub = this.foodItemService.descripcion.subscribe(descripcion => {
      this.descripcionVectro = descripcion;
    })

    this.categoriaSub = this.foodItemService.categoria.subscribe(categoria => {
      this.categoriaVector = categoria;
    });

    this.formcreateItem = new FormGroup({
      descripcion: this.createFormControl(),
      calorias: this.createFormControl(),
      carbohidrados: this.createFormControl(),
      proteinas: this.createFormControl(),
      grasas: this.createFormControl(),
      sodio: this.createFormControl(),
      azucar: this.createFormControl()
    });
    this.formPorciones = new FormGroup({
      // id: this.createFormControl(),
       arrayP: new FormArray([new FormGroup({
        descripcion: this.createFormControl(),
        gramosporporcion: this.createFormControl()
      })])
    });
    this.formCategorias = new FormGroup({
      arrayCategoria: new FormArray([new FormGroup({
        descripcion: this.createFormControl()
      })])
    })
  }

  onCreateItem(){
    for(let control of this.arrayP.controls){
      if(control instanceof FormGroup){
        console.log(control.value.descripcion.descripcion);
        console.log(control.value.gramosporporcion);
      }
    }
    for(let control of this.arrayCategoria.controls){
      if(control instanceof FormGroup){
        console.log(control.value.descripcion.descripcion);
      }
    }
  }
  onCancelCreation(){
    this.modalCtrl.dismiss(null,'cancel');
  }
  get gdescripcionVector(){
    return this.descripcionVectro;
  }
  get gcategoriaVector(){
    return this.categoriaVector;
  }

  goTo(){
  }
  get arrayP(){
    return this.formPorciones.controls["arrayP"] as FormArray;
  }
  get arrayCategoria(){
    return this.formCategorias.controls["arrayCategoria"] as FormArray;
  }
  AddCategoria(){
    this.isFirstCategoria = false;
    console.log(this.arrayCategoria);
    this.arrayCategoria.push(new FormGroup({
      descripcion: this.createFormControl()
    }));
    console.log(this.arrayCategoria);
  }
  onRemoveCategoria(index){
    console.log(this.arrayCategoria);
    this.arrayCategoria.removeAt(index);
    if(this.arrayCategoria.length == 1) this.isFirstCategoria = true;
    console.log(this.arrayCategoria)
  }
  AddPorcion(){
    this.isFirstDescripcion = false;
    (<FormArray>this.formPorciones.controls['arrayP'])
    .push(new FormGroup({
      descripcion: this.createFormControl(),
      gramosporporcion: this.createFormControl()
    }));
  }
  onRemovePorcion(index){
    (<FormArray>this.formPorciones.controls['arrayP']).removeAt(index);
    if( (<FormArray>this.formPorciones.controls['arrayP']).length == 1){
      this.isFirstDescripcion = true;
    }
  }

}
