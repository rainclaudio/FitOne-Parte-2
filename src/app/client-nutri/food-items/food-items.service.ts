import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import {
  Cantidad_item_descripcion,
  Categoria,
  DescripcionComun,
  ItemAlimentario,
  ItemEnCategoria,
} from '../nutricionPlan.model';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root',
})
export class FoodItemsService {
  private descrcipcionVector = new BehaviorSubject<DescripcionComun[]>([]);
  private categoriaVector = new BehaviorSubject<Categoria[]>([]);
  private cantidadDescripcionComunVector = new BehaviorSubject<
    Cantidad_item_descripcion[]
  >([]);
  private ItemsAlimentariosVector = new BehaviorSubject<ItemAlimentario[]>([]);
  private ItemEnCategoriaVector = new BehaviorSubject<ItemEnCategoria[]>([]);

  private lastiditemalimentario: string;

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {
    const newDescripcion1 = new DescripcionComun('descripcion1', 'Grande');
    const newDescripcion2 = new DescripcionComun('descripcion2', 'Mediano');
    const newDescripcion3 = new DescripcionComun('descripcion3', 'Pequeño');
    const newDescripcion4 = new DescripcionComun('descripcion4', 'Scoop');
    const newDescripcion5 = new DescripcionComun('descripcion5', 'Taza');
    const newDescripcion6 = new DescripcionComun('descripcion6', 'Unidad');
    const newDescripcion7 = new DescripcionComun('descripcion7', 'gr');
    const newDescripcion8 = new DescripcionComun('descripcion8', 'oz');
    const newDescripcion9 = new DescripcionComun('descripcion9', 'kg');
    const newDescripcion10 = new DescripcionComun('descripcion10', 'Libra');
    const newDescripcion11 = new DescripcionComun('descripcion11', 'Porción');
    const newDescripcion12 = new DescripcionComun(
      'descripcion12',
      'Cuchara dosificadora nido'
    );
    const newDescripcion13 = new DescripcionComun(
      'descripcion13',
      'Talonario de cheques'
    );
    const newDescripcion14 = new DescripcionComun(
      'descripcion14',
      'Palma de mano'
    );

    // const newItem1 = new ItemAlimentario('item1', 'banana', 1, 1, 1, 1, 1, 1);

    // this.add_item(newItem1).subscribe();

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

    const newCategoria1 = new Categoria(
      'categoria1',
      'Yogurt Protein Lonco leche',
      0,
      0,
      0,
      0,
      0,
      0
    );
    const newCategoria2 = new Categoria(
      'categoria2',
      'Cereales',
      0,
      0,
      0,
      0,
      0,
      0
    );
    const newCategoria3 = new Categoria(
      'categoria3',
      'Vegetales',
      0,
      0,
      0,
      0,
      0,
      0
    );
    const newCategoria4 = new Categoria(
      'categoria4',
      'Frutas',
      0,
      0,
      0,
      0,
      0,
      0
    );
    const newCategoria5 = new Categoria(
      'categoria5',
      'Carnes',
      0,
      0,
      0,
      0,
      0,
      0
    );
    const newCategoria6 = new Categoria(
      'categoria6',
      'Alimentos Ricos en lípidos',
      0,
      0,
      0,
      0,
      0,
      0
    );
    const newCategoria7 = new Categoria(
      'categoria7',
      'Batido Proteico',
      0,
      0,
      0,
      0,
      0,
      0
    );

    this.add_categoria(newCategoria1);
    this.add_categoria(newCategoria2);
    this.add_categoria(newCategoria3);
    this.add_categoria(newCategoria4);
    this.add_categoria(newCategoria5);
    this.add_categoria(newCategoria6);
    this.add_categoria(newCategoria7);
  }

  get Descripcion() {
    return this.descrcipcionVector.asObservable();
  }
  get Categoria() {
    return this.categoriaVector.asObservable();
  }
  get Cantidad_item_descripcion() {
    return this.cantidadDescripcionComunVector.asObservable();
  }
  get Items() {
    return this.ItemsAlimentariosVector.asObservable();
  }
  get ItemEnCategoria() {
    return this.ItemEnCategoriaVector.asObservable();
  }
  getObservable(collectionFR: string) {
    switch (collectionFR) {
      case 'ItemAlimentario':
        return this.Items;
      case 'CantidadItemDescripcion':
        return this.Cantidad_item_descripcion;
      case 'ItemEnCategoria':
        return this.ItemEnCategoria;
      case 'Descripcion':
        return this.Descripcion;
      case 'Categoria':
        return this.Categoria;
      default:
        break;
    }
  }
  concatenar(collectionFR: string, infoArray: any, infoData) {
    switch (collectionFR) {
      case 'ItemAlimentario':
        this.ItemsAlimentariosVector.next(infoArray.concat(infoData));
        break;
      case 'CantidadItemDescripcion':
        this.cantidadDescripcionComunVector.next(infoArray.concat(infoData));
        break;
      case 'ItemEnCategoria':
        this.ItemEnCategoriaVector.next(infoArray.concat(infoData));
        break;
      case 'Descripcion':
        this.descrcipcionVector.next(infoArray.concat(infoData));
        break;
      case 'Categoria':
        this.categoriaVector.next(infoArray.concat(infoData));
      case 'DescripcionComun':
        this.descrcipcionVector.next(infoArray.concat(infoData));
      default:
        break;
    }
  }
  add_toFirestore(
    data_to_concat: any,
    data_to_send: any,
    collectionFR: string,
    requiredID: boolean
  ) {
    let fetchedUserId;
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        if (!userId) {
          throw new Error('no user id found');
        }

        fetchedUserId = userId;
        if (requiredID) data_to_send.id = fetchedUserId;
        // console.log("SENDING DATA");
        // console.log(data_to_send);
        return (
          this.firestore
            .collection(collectionFR)
            // .add<{ name: string }>({ ...classInforme, id_informe: null }); // no se puede hacer eso
            .add(data_to_send)
        );
      }),
      switchMap((resData) => {
        this.lastiditemalimentario = resData.id;
        // this.last_id_info = resData.id;
        // itemalimentario.id = resData.id;
        data_to_concat.id = resData.id;
        return this.getObservable(collectionFR);
      }),
      take(1),
      tap((info) => {
        this.concatenar(collectionFR, info, data_to_concat);
        // classInforme.id_informe = this.last_id_info;
        // this.ItemsAlimentariosVector.next(info.concat(itemalimentario));
      })
    );
  }
  get lastItemAlimentario() {
    return this.lastiditemalimentario;
  }
  // ESTO VA EN OTRA PARTE
  add_descripcion(descripcionvar: DescripcionComun) {
    this.descrcipcionVector.pipe(take(1)).subscribe((descripcion) => {
      this.descrcipcionVector.next(descripcion.concat(descripcionvar));
    });
  }
  // ESTO VA EN OTRA PARTE
  add_categoria(categoriavar: Categoria) {
    this.categoriaVector.pipe(take(1)).subscribe((categoria) => {
      this.categoriaVector.next(categoria.concat(categoriavar));
    });
  }

  add_cantidad_item_descripcion(
    cantidad_item_descripcion: Cantidad_item_descripcion
  ) {
    this.cantidadDescripcionComunVector.pipe(take(1)).subscribe((cantidad) => {
      this.cantidadDescripcionComunVector.next(
        cantidad.concat(cantidad_item_descripcion)
      );
    });
    // console.log('CANTIDAD ITEM DESCRIPCION');
    // console.log(this.cantidadDescripcionComunVector);
  }
  add_ItemEnCategoria(itemcategoriavar: ItemEnCategoria) {
    this.ItemEnCategoriaVector.pipe(take(1)).subscribe((itemcategoria) => {
      this.ItemEnCategoriaVector.next(itemcategoria.concat(itemcategoriavar));
    });
    // console.log('ITEMS EN CATEGORIA');
    // console.log(this.ItemEnCategoriaVector);
  }

  get_ArrayData(collectionFR: string, datarecieved: any) {
    const answer = [];
    if (datarecieved.length !== 0) {
      switch (collectionFR) {
        case 'ItemAlimentario':
          for (let it of datarecieved) {
            answer.push(
              new ItemAlimentario(
                it.id,
                it.data.descripcion,
                it.data.calorias,
                it.data.cho,
                it.data.prot,
                it.data.fat,
                it.data.sodium,
                it.data.sugar,
                it.data.categoria
              )
            );
          }
          break;
        case 'CantidadItemDescripcion':
          for (let it of datarecieved) {
            answer.push(
              new Cantidad_item_descripcion(
                it.id,
                it.data.id_item,
                it.data.id_descripcion,
                it.data.gramos
              )
            );
          }
          break;
        case 'ItemEnCategoria':
          for (let it of datarecieved) {
            answer.push(
              new ItemEnCategoria(it.id, it.data.id_item, it.data.id_categoria)
            );
          }
          break;
        case 'Descripcion':
          for (let it of datarecieved) {
            answer.push(new DescripcionComun(it.id, it.data.descripcion));
          }
          break;
        default:
          break;
      }
    }
    return answer;
  }
  fetch_firebase(collectionFR: string) {
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        if (!userId) {
          throw new Error('User not found');
        }
        fetchedUserId = userId;
        return this.firestore.collection(collectionFR).snapshotChanges();
      }),
      map((returnedData) => {
        const datatoSave = [];

        returnedData.forEach((returnedData) => {
          var varinfo = {
            id: returnedData.payload.doc.id,
            data: returnedData.payload.doc.data(),
          };
          datatoSave.push(varinfo);
        });

        return datatoSave;
      }),
      tap((datarecieved) => {
        this.ItemsAlimentariosVector.next(
          this.get_ArrayData(collectionFR, datarecieved)
        );
      })
    );
  }
  getQuery(collectionFR: string, querys: string[]) {
    let fetchedUserId: string;

    let noLocalVector = new BehaviorSubject<any[]>([]);
    // console.log("holas");
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        if (!userId) {
          throw new Error('User not found');
        }
        fetchedUserId = userId;
        console.log("performing");
        return this.firestore
          .collection(collectionFR, (ref) =>
            ref.where('categoria', 'array-contains', querys[0])
          )
          .snapshotChanges();
      }),
      map((returnedData) => {
        // console.log(returnedData);
        const datatoSave = [];

        returnedData.forEach((returnedData) => {
          var varinfo = {
            id: returnedData.payload.doc.id,
            data: returnedData.payload.doc.data(),
          };
          datatoSave.push(varinfo);
        });
        return datatoSave;
      }),
      tap((datarecieved) => {
        // console.log(this.get_ArrayData(collectionFR,datarecieved));
        noLocalVector.next(this.get_ArrayData(collectionFR, datarecieved));
        return noLocalVector;
        // console.log(noLocalVector);
      })
    );
  }
}
