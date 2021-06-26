import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ItemAlimentario } from '../../nutricionPlan.model';
import { FoodItemsService } from '../food-items.service';
import { FoodItemTableDataSource, FoodItemTableItem } from './food-item-table-datasource';

@Component({
  selector: 'app-food-item-table',
  templateUrl: './food-item-table.component.html',
  styleUrls: ['./food-item-table.component.css']
})
export class FoodItemTableComponent implements AfterViewInit,OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ItemAlimentario>;
  dataSource: FoodItemTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['descripcion','calorias','cho','prot','fat','sodium','sugar'];

  constructor(private foodItemService: FoodItemsService) {
    console.log("constructing");
    this.dataSource = new FoodItemTableDataSource(this.foodItemService.Items);
  }

  ngOnInit(){
    console.log("holas");
  }
  ionViewWillEnter(){
    console.log("entering");
  }
  ngAfterViewInit(): void {
    console.log("after view");
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
