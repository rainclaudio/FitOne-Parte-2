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
    const newDescripcion7 = new DescripcionComun('descripcion7', 'Diente');
    const newDescripcion8 = new DescripcionComun('descripcion8', 'Cucharada');
    const newDescripcion9 = new DescripcionComun('descripcion9', 'Presa');
    const newDescripcion10 = new DescripcionComun(
      'descripcion10',
      'Talonario de cheques'
    );
    const newDescripcion11 = new DescripcionComun('descripcion11', 'Porción');
    const newDescripcion12 = new DescripcionComun(
      'descripcion12',
      'Cuchara dosificadora nido'
    );
    const newDescripcion13 = new DescripcionComun(
      'descripcion13',
      'Palma de mano'
    );

    // const newItem1 = new ItemAlimentario('item1', 'banana', 1, 1, 1, 1, 1, 1);

    // this.add_item(newItem1).subscribe();
    const arrayItemCerealesInfo = [
      new ItemAlimentario(
        '1',
        'Marraqueta',
        272,
        60.94,
        6.7,
        0.86,
        336,
        27.59,
        ['categoria2']
      ),
      new ItemAlimentario(
        '2',
        'Pan Molde Integral',
        246,
        46.1,
        9.7,
        4.2,
        527,
        5.57,
        ['categoria2']
      ),
      new ItemAlimentario(
        '3',
        'Avena Multisemillas Quaker',
        375,
        55,
        12.75,
        9.75,
        0,
        1.25,
        ['categoria2']
      ),
      new ItemAlimentario(
        '4',
        'Quínoa Inflada',
        534,
        28.88,
        18.29,
        42.16,
        813,
        1.55,
        ['categoria2']
      ),
      new ItemAlimentario(
        '5',
        'Semillas de linaza',
        534,
        28.88,
        18.29,
        42.16,
        30,
        1.55,
        ['categoria2']
      ),
      new ItemAlimentario(
        '6',
        'Arroz Blanco',
        129,
        27.9,
        2.66,
        0.38,
        365,
        0.05,
        ['categoria2']
      ),
      new ItemAlimentario('7', 'Fideos', 137, 25.01, 4.51, 2.06, 236, 0.4, [
        'categoria2',
      ]),
    ];
    const arrayItemLipidosInfo = [
      new ItemAlimentario('1', 'Maní', 567, 16.13, 25.8, 49.24, 18, 3.97, [
        'categoria6',
      ]),
      new ItemAlimentario('2', 'Almendras', 578, 19.74, 21.56, 50.64, 1, 4.8, [
        'categoria6',
      ]),
      new ItemAlimentario('3', 'Avellanas', 628, 16.7, 14.95, 60.75, 0, 4.34, [
        'categoria2',
      ]),
      new ItemAlimentario('4', 'Nueces', 654, 13.71, 15.23, 65.21, 2, 2.61, [
        'categoria6',
      ]),
      new ItemAlimentario('5', 'Pistacho', 600, 9.28, 21.07, 54.28, 404, 8.57, [
        'categoria6',
      ]),
    ];
    // this.addItemsAlimentarios(arrayItemLipidosInfo);

    const batido_proteico = [
      new ItemAlimentario('1', 'Batido Proteico', 120, 4, 24, 1, 300, 2, [
        'categoria7',
      ]),
    ];
    // this.addItemsAlimentarios(batido_proteico);
    const arrayVegetalesInfo = [
      new ItemAlimentario('1', 'Tomate', 18, 3.92, 0.88, 0.2, 5, 2.63, [
        'categoria3',
      ]),
      new ItemAlimentario('2', 'Lechuga', 14, 2.97, 0.9, 0.14, 10, 1.76, [
        'categoria3',
      ]),
      new ItemAlimentario('3', 'Zanahoria', 35, 8.24, 0.64, 0.13, 78, 4.76, [
        'categoria3',
      ]),
      new ItemAlimentario('4', 'Zapallo', 26, 6.5, 1, 0.1, 1, 1.36, [
        'categoria3',
      ]),
      new ItemAlimentario('5', 'Coliflor', 25, 5.3, 1.98, 0.1, 30, 2.4, [
        'categoria3',
      ]),
      new ItemAlimentario('6', 'Brócoli', 34, 6.64, 2.82, 0.37, 33, 1.7, [
        'categoria3',
      ]),
    ];
    const arrayCarnesInfo = [
      new ItemAlimentario('1', 'Huevo', 154, 12.53, 1.12, 10.57, 278, 1.12, [
        'categoria5',
      ]),
      new ItemAlimentario('2', 'Pollo', 195, 0, 29.55, 7.72, 393, 0, [
        'categoria5',
      ]),
      new ItemAlimentario('3', 'Atún', 116, 0, 25.51, 0.82, 338, 0, [
        'categoria5',
      ]),
      new ItemAlimentario('4', 'Pescado', 134, 0, 19.09, 5.86, 51, 0, [
        'categoria5',
      ]),
      new ItemAlimentario('5', 'Vacuno,Punta Picana', 129, 0, 21.69, 4, 61, 0, [
        'categoria5',
      ]),
      new ItemAlimentario('6', 'Choritos', 59, 1.4, 9, 1.9, 194, 0, [
        'categoria5',
      ]),
    ];
    // this.addItemsAlimentarios(arrayItemCerealesInfo);
    // this.addItemsAlimentarios(arrayItemLipidosInfo);
    // this.addItemsAlimentarios(batido_proteico);
    // this.addItemsAlimentarios(arrayVegetalesInfo);
    // this.addItemsAlimentarios(arrayCarnesInfo);

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

    const newCategoria1 = new Categoria(
      'categoria1',
      'Yogurt Protein Lonco leche'
    );
    const newCategoria2 = new Categoria('categoria2', 'Cereales');
    const newCategoria3 = new Categoria('categoria3', 'Vegetales');
    const newCategoria4 = new Categoria('categoria4', 'Frutas');
    const newCategoria5 = new Categoria('categoria5', 'Carnes');
    const newCategoria6 = new Categoria(
      'categoria6',
      'Alimentos Ricos en lípidos'
    );
    const newCategoria7 = new Categoria('categoria7', 'Batido Proteico');
    const newCategoria8 = new Categoria('categoria8', 'Lácteos');

    this.add_categoria(newCategoria1);
    this.add_categoria(newCategoria2);
    this.add_categoria(newCategoria3);
    this.add_categoria(newCategoria4);
    this.add_categoria(newCategoria5);
    this.add_categoria(newCategoria6);
    this.add_categoria(newCategoria7);
    this.add_categoria(newCategoria8);
  }
  addItemsAlimentarios(arrayAlimentario) {
    for (let it of arrayAlimentario) {
      this.add_toFirestore(
        {
          id: it.id,
          descripcion: it.descripcion,
          calorias: it.calorias,
          cho: it.cho,
          prot: it.prot,
          fat: it.fat,
          sodium: it.sodium,
          sugar: it.sugar,
          categoria: it.categoria,
        },
        {
          descripcion: it.descripcion,
          calorias: it.calorias,
          cho: it.cho,
          prot: it.prot,
          fat: it.fat,
          sodium: it.sodium,
          sugar: it.sugar,
          categoria: it.categoria,
        },
        'ItemAlimentario',
        false
      ).subscribe(() => {});
    }
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
        console.log('performing');
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
