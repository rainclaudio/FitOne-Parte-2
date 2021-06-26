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
    this.descripcionSub = this.foodItemService.descripcion.subscribe(
      (descripcion) => {
        this.descripcionVectro = descripcion;
      }
    );

    this.categoriaSub = this.foodItemService.categoria.subscribe(
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
    const last_item_id = this.foodItemService.add_item(
      new ItemAlimentario(
        'borrable',
        this.formcreateItem.value.descripcion,
        this.formcreateItem.value.calorias,
        this.formcreateItem.value.carbohidratos,
        this.formcreateItem.value.proteinas,
        this.formcreateItem.value.grasas,
        this.formcreateItem.value.sodio,
        this.formcreateItem.value.azucar
      )
      );

    for (let control of this.arrayP.controls) {
      if (control instanceof FormGroup) {
        this.foodItemService.add_cantidad_item_descripcion(
          new Cantidad_item_descripcion(
            'borrable',
            last_item_id,
            control.value.descripcion.id,
            control.value.gramosporporcion
          )
        );
      }
    }
    for (let control of this.arrayCategoria.controls) {
      if (control instanceof FormGroup) {
        this.foodItemService.add_ItemEnCategoria(
          new ItemEnCategoria(
            'borrable',
            last_item_id,
            control.value.descripcion.id
          )
        )
        console.log(control.value.descripcion.descripcion);
      }
    }
    this.resetForms();
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
