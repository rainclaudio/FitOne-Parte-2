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
    (<FormArray>this.formCategorias.controls['arrayCategoria'])
    .push(new FormGroup({
      descripcion: this.createFormControl(),
     }));
  }
  onRemoveCategoria(index){
    (<FormArray>this.formCategorias.controls['arrayCategoria']).removeAt(index);
    if( (<FormArray>this.formCategorias.controls['arrayCategoria']).length == 1){
      this.isFirstCategoria = true;
    }
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
