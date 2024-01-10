import { Component } from '@angular/core';
import { Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../services/ProductService/product.service';
import { Product } from '../Models/Product';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  conditionProduct: string[] = ["New", "Second Hand", "B/Y"]

  productForm!: FormGroup

  actionBtn: string = "Save"

  constructor(private formBuilder: FormBuilder, 
    private api: ProductService, 
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: Product
    ) { }

    ngOnInit(): void {    
      this.productForm = this.formBuilder.group({
        productName: ["", Validators.required],
        category: ['', Validators.required],
        condition: ['', Validators.required],
        price: ['', Validators.required],
        comment: [''],
        date: ["", Validators.required]
      })
  
      if(this.editData){
        this.actionBtn = "update";
        this.productForm.controls['productName'].setValue(this.editData.productName);
        this.productForm.controls['category'].setValue(this.editData.category);
        this.productForm.controls['condition'].setValue(this.editData.condition);
        this.productForm.controls['price'].setValue(this.editData.price);
        this.productForm.controls['comment'].setValue(this.editData.comment);
        this.productForm.controls['date'].setValue(this.editData.date);
      }
  
    }


    addProduct(){
      if(!this.editData){
        if(this.productForm.valid){
          this.api.postProduct(this.productForm.value)
          .subscribe({
            next: () => {
              alert("Product addddes sucsessfully")
              this.productForm.reset()
              this.dialogRef.close("save")
            },
            error: () => {
              alert("Soomething went wrong while adding")
            }
          })
        }
      }
      else {
        this.updateProduct()
      }
    }

    updateProduct() {
      this.api.putProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Product updated sucsessfully")
          this.productForm.reset()
          this.dialogRef.close('update')
        },
  
        error: () => {
          alert("Something went wrong while updating")
        }
      })
    }

}
