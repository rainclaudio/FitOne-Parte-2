import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ItemAlimentario } from '../../nutricionPlan.model';
import { FoodItemTableDataSource, FoodItemTableItem } from './food-item-table-datasource';

@Component({
  selector: 'app-food-item-table',
  templateUrl: './food-item-table.component.html',
  styleUrls: ['./food-item-table.component.css']
})
export class FoodItemTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ItemAlimentario>;
  dataSource: FoodItemTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['descripcion','calorias','cho','prot','fat','sodium','sugar'];

  constructor() {
    this.dataSource = new FoodItemTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
