import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { merge, Observable, Subscription, of as observableOf } from 'rxjs';
import { MedicionesService } from '../../mediciones.service';
import { clientItem } from '../../clientItem.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Categoria,
  displayPreparacionDePorciones,
  ItemAlimentario,
  PreparacionDePorciones,
} from '../../nutricionPlan.model';
import { FoodItemsService } from '../../food-items/food-items.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatTable,
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-diet-routine',
  templateUrl: './new-diet-routine.page.html',
  styleUrls: ['./new-diet-routine.page.scss'],
})
export class NewDietRoutinePage implements OnInit, OnDestroy {
  private id_client: string;
  private clientSub: Subscription;
  private clientItem: clientItem;

  private macroCarboPercent: number;
  private macroProteinPercent: number;
  private macroFatPercent: number;

  private macroCarboGram: number;
  private macroProteinGram: number;
  private macroFatGram: number;

  private totalCalories: number;

  formPorcionesDeIntercambio: FormGroup;
  private categoriaVector: Categoria[] = [];
  private categoriaSub: Subscription;

  data: displayPreparacionDePorciones[] = [];
  dataSub: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<displayPreparacionDePorciones>;
  dataSource: MatTableDataSource<displayPreparacionDePorciones>;
  displayedColumns = [
    'categoria',
    'porciones',
    'gramosporporcion',
    'condicion',
    'carbohidratos',
    'lipidos',
    'proteinas',
  ];

  customActionSheetOptions: any = {
    header: 'Categoria',
    subHeader: 'Seleccione una categoria',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navController: NavController,
    private medicionesService: MedicionesService,
    private foodItemService: FoodItemsService,
    private modalCtrl: ModalController
  ) {}
  createFormControl() {
    return new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required],
    });
  }
  ngOnInit() {
    this.route.paramMap.subscribe((pmap) => {
      if (!pmap.has('id_client')) {
        this.navController.navigateBack('client-nutri/tabs');
        return;
      }
      this.setup_macros();
      this.setup_forms();
      this.setup_vectors();
      this.setup_table();

      this.id_client = pmap.get('id_client');
      console.log(this.id_client);
      this.clientSub = this.medicionesService
        .getClient(this.id_client)
        .subscribe((client) => {
          this.clientItem = client;
        });
    });
  }
  setup_vectors() {
    this.categoriaSub = this.foodItemService.Categoria.subscribe((cat) => {
      this.categoriaVector = cat;
    });
  }
  setup_forms() {
    this.formPorcionesDeIntercambio = new FormGroup({
      categoria: this.createFormControl(),
      porciones: this.createFormControl(),
      gramosporporcion: this.createFormControl(),
      condicion: this.createFormControl(),
    });
  }

  setup_macros() {
    this.macroCarboPercent = 50;
    this.macroFatPercent = 15;
    this.macroProteinPercent = 35;
    this.macroCarboGram = Math.round(
      (this.totalCalories * this.macroCarboPercent) / 100 / 4
    );
    this.macroProteinGram = Math.round(
      (this.totalCalories * this.macroProteinPercent) / 100 / 4
    );
    this.macroFatGram = Math.round(
      (this.totalCalories * this.macroFatPercent) / 100 / 9
    );
  }
  setup_table() {
    this.dataSource = new MatTableDataSource(this.data);
  }
  carbosChangeSlider(event: any) {
    // console.log("holis");
    this.macroCarboPercent = event.detail.value;
    this.macroCarboGram = Math.round(
      (this.totalCalories * this.macroCarboPercent) / 100 / 4
    );

    console.log(event.detail.value);
  }
  proteinChangeSlider(event: any) {
    this.macroProteinPercent = event.detail.value;
    this.macroProteinGram = Math.round(
      (this.totalCalories * this.macroProteinPercent) / 100 / 4
    );

    console.log(event.detail.value);
  }
  fatChangeSlider(event: any) {
    this.macroFatPercent = event.detail.value;
    this.macroFatGram = Math.round(
      (this.totalCalories * this.macroFatPercent) / 100 / 9
    );
    console.log(event.detail.value);
  }

  get Categoria() {
    return this.categoriaVector;
  }
  onAddPrepPorcion() {
    let promcarbohidratos = 0;
    let promlipidos = 0;
    let promproteinas = 0;
    this.foodItemService
      .getQuery('ItemAlimentario', [
        this.formPorcionesDeIntercambio.value.categoria.id,
        'hola',
      ])
      .subscribe((datarecieved) => {
        console.log(datarecieved);

        for(let it of datarecieved){
          promcarbohidratos+=it.data.cho;
          promlipidos+=it.data.fat;
          promproteinas+=it.data.prot;
        }
        promcarbohidratos /= datarecieved.length;
        promproteinas /=datarecieved.length;
        promlipidos /= datarecieved.length;


    const answer: displayPreparacionDePorciones = {
      categoria: this.formPorcionesDeIntercambio.value.categoria.descripcion,
      porciones: this.formPorcionesDeIntercambio.value.porciones,
      gramosporporcion: this.formPorcionesDeIntercambio.value.gramosporporcion,
      condicion: this.formPorcionesDeIntercambio.value.condicion,
      carbohidratos: promcarbohidratos,
      lipidos: promlipidos,
      proteinas: promproteinas,
    };
    this.data.push(answer);
    this.dataSource.data = this.data;
    // this.dataSource.data.push(answer);
    this.table.dataSource = this.dataSource;
    console.log('answer');
    console.log(answer);
    this.formPorcionesDeIntercambio.reset();
      });

  }
  ngAfterViewInit(): void {
    // console.log("after view");
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<displayPreparacionDePorciones[]> {
    // console.log("holas DATASOURSE");
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    console.log('destroying');
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(
    data: displayPreparacionDePorciones[]
  ): displayPreparacionDePorciones[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(
    data: displayPreparacionDePorciones[]
  ): displayPreparacionDePorciones[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }
    // console.log("sorting");
    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'categoria':
          return compare(+a.categoria, +b.categoria, isAsc);
        case 'porciones':
          return compare(+a.porciones, +b.porciones, isAsc);
        case 'gramosporporcion':
          return compare(+a.gramosporporcion, +b.gramosporporcion, isAsc);
        case 'condicion':
          return compare(+a.condicion, +b.condicion, isAsc);
        case 'carbohidratos':
          return compare(+a.carbohidratos, +b.carbohidratos, isAsc);
        case 'lipidos':
          return compare(+a.lipidos, +b.lipidos, isAsc);
        case 'proteinas':
          return compare(a.proteinas, b.proteinas, isAsc);
        default:
          return 0;
      }
    });
  }

  get gmacroCarboPercent() {
    return this.macroCarboPercent;
  }
  get gmacroProteinPercent() {
    return this.macroProteinPercent;
  }
  get gmacroFatPercent() {
    return this.macroFatPercent;
  }
  get gmacroCarboGram() {
    return this.macroCarboGram;
  }
  get gmacroProteinGram() {
    return this.macroProteinGram;
  }
  get gmacroFatGram() {
    return this.macroFatGram;
  }
  get gtotalPercent() {
    return (
      this.macroFatPercent + this.macroProteinPercent + this.macroCarboPercent
    );
  }
  unSubscribe() {
    if (this.clientSub) this.clientSub.unsubscribe();
    if (this.categoriaSub) this.categoriaSub.unsubscribe();
  }
  ngOnDestroy() {
    this.unSubscribe();
  }
}
/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
