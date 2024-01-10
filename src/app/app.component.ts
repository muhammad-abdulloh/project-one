import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatColumnDef, MatTableDataSource } from '@angular/material/table';
import { ProductService } from './frontToBackendComponents/services/ProductService/product.service';
import { Product } from './frontToBackendComponents/Models/Product';
import { DialogComponent } from './frontToBackendComponents/dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private dialog: MatDialog, private api: ProductService) { }

  title = 'project-one';

  displayedColumns: string[] = ['id', 'productName', 'category', 'condition', 'price', 'comment', 'date', 'action'];
  // is any
  dataSource!: MatTableDataSource<Product>;
  dataSourse2: Product[] = [];
  dataSourse3: Product[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  productItems: any;
  ngOnInit(): void {
    this.getAllProducts()
    
    
    

  }

  refreshProducts(){
    this.productItems = this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: "30%"
    }).afterClosed().subscribe(res => {
      if (res === "save") {
        this.getAllProducts()
      }
    })
  }

  getAllProducts() {
    this.api.getAllProducts()
      .subscribe(
        (respone) => {
          this.dataSourse3=
        this.dataSourse2=respone;
        });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(res => {
      if (res === "update") {
        this.getAllProducts()
      }
    })
  }

  deleteProduct(row: any) {
    this.api.deleteProduct(row.id).subscribe({
      next: (res) => {
        console.log(row);
        console.log("this is result");
        console.log(res);
        alert("Product delete Sucsessfully")
        this.getAllProducts()
      },
      
      error: () => {
        console.log(row);
        alert("Something want wrong while delete product")
      }
    })
  }


  filter(filed: string, value: string) {
    console.log(filed)
    console.log(value)
    switch (filed) {
      case 'productName': this.dataSourse3=this.dataSourse2.filter(x => x.productName.toLocaleLowerCase().includes(value));break;
      case 'category': this.dataSourse3=this.dataSourse2.filter(x => x.category.includes(value));break;
      case 'condition': this.dataSourse3=this.dataSourse2.filter(x => x.condition.toLocaleLowerCase().includes(value));break;
      case 'price': this.dataSourse3=this.dataSourse2.filter(x => x.price.toLocaleString().includes(value));break;
      case 'comment': this.dataSourse3=this.dataSourse2.filter(x => x.comment.toLocaleLowerCase().includes(value));break;
      case 'date': this.dataSourse3=this.dataSourse2.filter(x => x.date.toLocaleLowerCase().includes(value));break;
    }
  }
}
