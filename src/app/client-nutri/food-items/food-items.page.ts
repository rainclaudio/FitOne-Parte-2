import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Observable,of as observableOf, merge, Subscription  } from 'rxjs';
import { clientItem } from '../clientItem.model';
import { ItemAlimentario } from '../nutricionPlan.model';
import { CreateItemComponent } from './create-item/create-item.component';
import { FoodItemTableDataSource } from './food-item-table-datasource';
import { FoodItemTableComponent } from './food-item-table/food-item-table.component';
import { FoodItemsService } from './food-items.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-food-items',
  templateUrl: './food-items.page.html',
  styleUrls: ['./food-items.page.scss'],
})
export class FoodItemsPage implements OnInit,AfterViewInit {
  form: FormGroup;

  data: ItemAlimentario[] = [];
  dataSub: Subscription;
  // paginator: MatPaginator | undefined;
  // sort: MatSort | undefined;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ItemAlimentario>;
  dataSource: MatTableDataSource<ItemAlimentario>;
  displayedColumns = ['descripcion','calorias','cho','prot','fat','sodium','sugar'];
  constructor(
    private modalCtrl:ModalController,
    private foodItemservice: FoodItemsService,

  ) { }

  ngOnInit() {
    // this.dataSource = new FoodItemTableDataSource(this.foodItemservice.Items);
    this.dataSub = this.foodItemservice.Items.subscribe(itemsAlimentarios => {
      this.data = itemsAlimentarios;
    });

    // console.log("food items on init");
    // console.log(this.data);
    this.dataSource = new MatTableDataSource(this.data);
  }
  ionViewWillEnter(){
    // console.log("ION ENTER FOODSITEMS");
    this.foodItemservice.fetch_firebase('ItemAlimentario').subscribe(
      () => {
        // console.log("mejercuto");
        this.dataSource.data = this.data;
        // console.log(this.data);
        this.table.dataSource = this.dataSource;
      }
    );


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
     connect(): Observable<ItemAlimentario[]> {

    // console.log("holas DATASOURSE");
      if (this.paginator && this.sort) {
        // Combine everything that affects the rendered data into one update
        // stream for the data-table to consume.
        return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
          .pipe(map(() => {
            return this.getPagedData(this.getSortedData([...this.data ]));
          }));
      } else {
        throw Error('Please set the paginator and sort on the data source before connecting.');
      }
    }

    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect(): void {
      console.log("destroying");
    }

    /**
     * Paginate the data (client-side). If you're using server-side pagination,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getPagedData(data: ItemAlimentario[]): ItemAlimentario[] {
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
    private getSortedData(data: ItemAlimentario[]): ItemAlimentario[] {
      if (!this.sort || !this.sort.active || this.sort.direction === '') {
        return data;
      }
      // console.log("sorting");
      return data.sort((a, b) => {
        const isAsc = this.sort?.direction === 'asc';
        switch (this.sort?.active) {
          case 'calorias': return compare(+a.calorias, +b.calorias, isAsc);
          case 'cho': return compare(+a.cho, +b.cho, isAsc);
          case 'prot': return compare(+a.prot, +b.prot, isAsc);
          case 'fat': return compare(+a.fat, +b.fat, isAsc);
          case 'sodium': return compare(+a.sodium, +b.sodium, isAsc);
          case 'sugar': return compare(+a.sugar, +b.sugar, isAsc);
          case 'descripcion': return compare(a.id, b.id, isAsc);
          default: return 0;
        }
      });
    }

  }

  /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
  function compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


