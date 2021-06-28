import { findLast } from '@angular/compiler/src/directive_resolver';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Cantidad_item_descripcion, Categoria, DescripcionComun, ItemAlimentario, ItemEnCategoria } from '../../nutricionPlan.model';
import { FoodItemsService } from '../food-items.service';

@Component({
  selector: 'app-crear-item',
  templateUrl: './crear-item.page.html',
  styleUrls: ['./crear-item.page.scss'],
})
export class CrearItemPage implements OnInit {

  customActionSheetOptions: any = {
    header: 'Descripcion',
    subHeader: 'Seleccione una descripcion',
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
    private foodItemService: FoodItemsService,
    private navCtrl: NavController
  ) {}
  createFormControl() {
    return new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required],
    });
  }
  createFormControl2(defaultValue: number) {
    var form_control = new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required],
    });
    form_control.setValue(defaultValue);
    return form_control;
  }
  ngOnInit() {
    this.descripcionSub = this.foodItemService.Descripcion.subscribe(
      (descripcion) => {
        this.descripcionVectro = descripcion;
      }
    );

    this.categoriaSub = this.foodItemService.Categoria.subscribe(
      (categoria) => {
        this.categoriaVector = categoria;
      }
    );

    this.formcreateItem = new FormGroup({
      descripcion: this.createFormControl(),
      calorias: this.createFormControl2(89),
      carbohidratos: this.createFormControl2(22.84),
      proteinas: this.createFormControl2(1.09),
      grasas: this.createFormControl2(0.33),
      sodio: this.createFormControl2(0.1),
      azucar: this.createFormControl2(1.22),
    });
    this.formPorciones = new FormGroup({
      // id: this.createFormControl(),
      arrayP: new FormArray([
        new FormGroup({
          descripcion: this.createFormControl(),
          gramosporporcion: this.createFormControl(),
        }),
      ]),
    });
    this.formCategorias = new FormGroup({
      arrayCategoria: new FormArray([
        new FormGroup({
          descripcion: this.createFormControl(),
        }),
      ]),
    });
  }
  resetForms(){
    this.formPorciones.reset();
    this.formCategorias.reset();
    this.formcreateItem.reset();
  }
  onCreateItem() {
    if (
      !this.formcreateItem.valid ||
      !this.arrayP.valid ||
      !this.arrayCategoria.valid
    ) {
      return;
    }
    let answerItemCategoria = [];
    for(let control of this.arrayCategoria.controls){
      if(control instanceof FormGroup){
        answerItemCategoria.push(control.value.descripcion.id);
      }
    }

    this.foodItemService.add_toFirestore(
      {
       id:  'borrable',
       descripcion: this.formcreateItem.value.descripcion,
       calorias:  this.formcreateItem.value.calorias,
       cho:  this.formcreateItem.value.carbohidratos,
       prot:  this.formcreateItem.value.proteinas,
       fat:  this.formcreateItem.value.grasas,
       sodium:  this.formcreateItem.value.sodio,
       sugar:  this.formcreateItem.value.azucar,
       categoria: answerItemCategoria
      },
      {
        descripcion: this.formcreateItem.value.descripcion,
        calorias:  this.formcreateItem.value.calorias,
        cho:  this.formcreateItem.value.carbohidratos,
        prot:  this.formcreateItem.value.proteinas,
        fat:  this.formcreateItem.value.grasas,
        sodium:  this.formcreateItem.value.sodio,
        sugar:  this.formcreateItem.value.azucar,
        categoria: answerItemCategoria
      },
      'ItemAlimentario',
      false
    ).subscribe( () => {
      for (let control of this.arrayP.controls) {
        if (control instanceof FormGroup) {
          console.log(control);
          this.foodItemService.add_toFirestore(
            {
              id: 'borrable',
              id_item: this.foodItemService.lastItemAlimentario,
              id_descripcion: control.value.descripcion.id,
              gramos: control.value.gramosporporcion
            },
            {
              id_item: this.foodItemService.lastItemAlimentario,
              id_descripcion: control.value.descripcion.id,
              gramos: control.value.gramosporporcion
            },
            'CantidadItemDescripcion',
            false
          ).subscribe( () => {

          });
        }
      }
      console.log("passing this line");
      for (let control of this.arrayCategoria.controls) {
        if (control instanceof FormGroup) {
          this.foodItemService.add_toFirestore(
            {
              id: 'borrable',
              id_item: this.foodItemService.lastItemAlimentario,
              id_categoria: control.value.descripcion.id
            },
            {
              id_item: this.foodItemService.lastItemAlimentario,
              id_categoria: control.value.descripcion.id
            },
            'ItemEnCategoria',
            false
          ).subscribe( () => {

          });
          this.navCtrl.navigateBack('client-nutri/tabs/food-items');
        }
      }
    })
    // this.resetForms();
  }
  onCancelCreation() {
    this.navCtrl.navigateBack('client-nutri/tabs/food-items');
  }
  get gdescripcionVector() {
    return this.descripcionVectro;
  }
  get gcategoriaVector() {
    return this.categoriaVector;
  }

  goTo() {}
  get arrayP() {
    return this.formPorciones.controls['arrayP'] as FormArray;
  }
  get arrayCategoria() {
    return this.formCategorias.controls['arrayCategoria'] as FormArray;
  }
  AddCategoria() {
    this.isFirstCategoria = false;
    console.log(this.arrayCategoria);
    this.arrayCategoria.push(
      new FormGroup({
        descripcion: this.createFormControl(),
      })
    );
    console.log(this.arrayCategoria);
  }
  onRemoveCategoria(index) {
    console.log(this.arrayCategoria);
    this.arrayCategoria.removeAt(index);
    if (this.arrayCategoria.length == 1) this.isFirstCategoria = true;
    console.log(this.arrayCategoria);
  }
  AddPorcion() {
    this.isFirstDescripcion = false;
    (<FormArray>this.formPorciones.controls['arrayP']).push(
      new FormGroup({
        descripcion: this.createFormControl(),
        gramosporporcion: this.createFormControl(),
      })
    );
  }
  onRemovePorcion(index) {
    (<FormArray>this.formPorciones.controls['arrayP']).removeAt(index);
    if ((<FormArray>this.formPorciones.controls['arrayP']).length == 1) {
      this.isFirstDescripcion = true;
    }
  }
}
