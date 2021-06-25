import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Cantidad_item_descripcion, Categoria, DescripcionComun, ItemAlimentario, ItemEnCategoria } from '../nutricionPlan.model';

@Injectable({
  providedIn: 'root'
})
export class FoodItemsService {
  private descrcipcionVector = new BehaviorSubject<DescripcionComun[]>([]);
  private categoriaVector = new BehaviorSubject<Categoria[]>([]);
  private cantidadDescripcionComunVector = new BehaviorSubject<Cantidad_item_descripcion[]>([]);
  private ItemsAlimentariosVector = new BehaviorSubject<ItemAlimentario[]>([]);
  private ItemEnCategoriaVector = new BehaviorSubject<ItemEnCategoria[]>([]);
  constructor() {
    const newDescripcion1 = new DescripcionComun('descripcion1','Grande');
    const newDescripcion2 = new DescripcionComun('descripcion2','Mediano');
    const newDescripcion3 = new DescripcionComun('descripcion3','Pequeño');
    const newDescripcion4 = new DescripcionComun('descripcion4','Scoop');
    const newDescripcion5 = new DescripcionComun('descripcion5','Taza');
    const newDescripcion6 = new DescripcionComun('descripcion6','Unidad');
    const newDescripcion7 = new DescripcionComun('descripcion7','gr');
    const newDescripcion8 = new DescripcionComun('descripcion8','oz');
    const newDescripcion9 = new DescripcionComun('descripcion9','kg');
    const newDescripcion10 = new DescripcionComun('descripcion10','Libra');
    const newDescripcion11 = new DescripcionComun('descripcion11','Porción');
    const newDescripcion12 = new DescripcionComun('descripcion12','Cuchara dosificadora nido');
    const newDescripcion13 = new DescripcionComun('descripcion13','Talonario de cheques');
    const newDescripcion14 = new DescripcionComun('descripcion14','Palma de mano');

    this.add_descripcion(newDescripcion1);
    this.add_descripcion(newDescripcion2);
    this.add_descripcion(newDescripcion3);
    this.add_descripcion(newDescripcion4);
    this.add_descripcion(newDescripcion5);
    this.add_descripcion(newDescripcion6);
    this.add_descripcion(newDescripcion7);
    this.add_descripcion(newDescripcion8);
    this.add_descripcion(newDescripcion9);
    this.add_descripcion(newDescripcion10);
    this.add_descripcion(newDescripcion11);
    this.add_descripcion(newDescripcion12);
    this.add_descripcion(newDescripcion13);
    this.add_descripcion(newDescripcion14);

    const newCategoria1 = new Categoria('categoria1','Yogurt Protein Lonco leche',0,0,0,0,0,0);
    const newCategoria2 = new Categoria('categoria2','Cereales',0,0,0,0,0,0);
    const newCategoria3 = new Categoria('categoria3','Vegetales',0,0,0,0,0,0);
    const newCategoria4 = new Categoria('categoria4','Frutas',0,0,0,0,0,0);
    const newCategoria5 = new Categoria('categoria5','Carnes',0,0,0,0,0,0);
    const newCategoria6 = new Categoria('categoria6','Alimentos Ricos en lípidos',0,0,0,0,0,0);
    const newCategoria7 = new Categoria('categoria7','Batido Proteico',0,0,0,0,0,0);

    this.add_categoria(newCategoria1);
    this.add_categoria(newCategoria2);
    this.add_categoria(newCategoria3);
    this.add_categoria(newCategoria4);
    this.add_categoria(newCategoria5);
    this.add_categoria(newCategoria6);
    this.add_categoria(newCategoria7);

  }

  get descripcion(){
    return this.descrcipcionVector.asObservable();
  }
  get categoria(){
    return this.categoriaVector.asObservable();
  }
  get cantidad_item_descripcion(){
    return this.cantidadDescripcionComunVector.asObservable();
  }
  get Items(){
    return this.ItemsAlimentariosVector.asObservable();
  }
  add_item(itemalimentario: ItemAlimentario){
   const randomString = Math.random().toString();
   console.log(itemalimentario);

    itemalimentario.id = randomString;
    console.log(itemalimentario);
    this.ItemsAlimentariosVector.pipe(take(1)).subscribe((item) => {
      console.log(itemalimentario.cho);
      this.ItemsAlimentariosVector.next(item.concat(itemalimentario));
    });
    console.log('ITEMS ALIMENTARIOS');
    console.log(this.ItemsAlimentariosVector);
    return randomString;
  }
  // ESTO VA EN OTRA PARTE
  add_descripcion(descripcionvar: DescripcionComun){
    this.descrcipcionVector.pipe(take(1)).subscribe((descripcion) => {
      this.descrcipcionVector.next(descripcion.concat(descripcionvar));
    });
  }
  // ESTO VA EN OTRA PARTE
  add_categoria(categoriavar: Categoria){
    this.categoriaVector.pipe(take(1)).subscribe((categoria) => {
      this.categoriaVector.next(categoria.concat(categoriavar));
    });

  }

  add_cantidad_item_descripcion(cantidad_item_descripcion: Cantidad_item_descripcion){
    this.cantidadDescripcionComunVector.pipe(take(1)).subscribe((cantidad) => {
      this.cantidadDescripcionComunVector.next(cantidad.concat(cantidad_item_descripcion));
    });
    console.log('CANTIDAD ITEM DESCRIPCION');
    console.log(this.cantidadDescripcionComunVector);
  }
  add_ItemEnCategoria(itemcategoriavar: ItemEnCategoria){
    this.ItemEnCategoriaVector.pipe(take(1)).subscribe((itemcategoria) => {
      this.ItemEnCategoriaVector.next(itemcategoria.concat(itemcategoriavar));
    });
    console.log('ITEMS EN CATEGORIA');
    console.log(this.ItemEnCategoriaVector);
  }

}
