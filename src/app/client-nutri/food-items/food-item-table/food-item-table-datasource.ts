import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { ItemAlimentario,InfoAlimentaria } from '../../nutricionPlan.model';
// TODO: Replace this with your own data model type
export interface FoodItemTableItem {
  name: string;
  id: number;
}

// TODO: replace this with real data from your application
const infoAlimentaria: InfoAlimentaria =
  { descripcion: '1', calorias: 1, cho: 1, prot:1,fat:1,sodium:1,sugar:1}

const EXAMPLE_DATA: ItemAlimentario[] = [

  new ItemAlimentario('item1','Platano',89,22.84,1.09,0.33,0.1,1.22),
  new ItemAlimentario('item2','Protein Yogurt, lonco leche',69,5.9,10,0.6,64,5.8),
  new ItemAlimentario('item3','Pechuga Pollo',195,0,29.55,7.72,393,0),
  new ItemAlimentario('item4','Arroz',332,73.4,8,2.8,424,1),
  new ItemAlimentario('item5','Avena Multisemillas Quaker',376,56,13,9.9,4.9,1.3),
  new ItemAlimentario('item6','Egg',141,0.68,12.7,9.7,360,0),
  new ItemAlimentario('item7','Carne Magra',138,2,24,3,86,10),
  new ItemAlimentario('item8','Pan Hallulla',309,62,8,4,122,0)
  // {id: '1',descripcion: '1', calorias: 1, cho: 1, prot:1,fat:1,sodium:1,sugar:1},
];

/**
 * Data source for the FoodItemTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class FoodItemTableDataSource extends DataSource<ItemAlimentario> {
  data: ItemAlimentario[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ItemAlimentario[]> {
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
  disconnect(): void {}

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
