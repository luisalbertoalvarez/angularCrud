import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../serveices/api.service';
import {MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog'
import { DialogRef } from '@angular/cdk/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnessList=["Brand New","Second Hand","Refurbished"]
  productForm !: FormGroup;
  actionBtn : string ="Save";
  constructor(private formBuilder : FormBuilder , 
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editDate : any,
    private dialogRef : MatDialogRef<DialogComponent>){}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      freshness:['',Validators.required],
      price:['',Validators.required],
      comment:['',Validators.required],
      date:['',Validators.required]

    });
    if(this.editDate){
      this.actionBtn = "Update";
      this.productForm.controls['productName'].setValue(this.editDate.productName);
      this.productForm.controls['category'].setValue(this.editDate.category);
      this.productForm.controls['freshness'].setValue(this.editDate.freshness);
      this.productForm.controls['price'].setValue(this.editDate.price);
      this.productForm.controls['comment'].setValue(this.editDate.comment);
      this.productForm.controls['date'].setValue(this.editDate.date);
    }
    
  }
  addProduct(){
    if(!this.editDate){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            alert("Product added successfully");
            this.productForm.reset();
            this.dialogRef.close('Save');
          },
          error:()=>{
            alert("Error while adding the product")
          }
        })
      }  
    }else{
      this.updateProduct()
    }     
  }
    updateProduct(){
      this.api.putProduct(this.productForm.value,this.editDate.id)
      .subscribe({
        next:(res)=>{
          alert("Product updated Sucessfully");
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Error while updateing the record!!");
        }
      })
      }
    }


