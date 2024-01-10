import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../Models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = "https://localhost:7083/api/Products/";
  
  constructor(private http: HttpClient) { }

  postProduct(data: any) {
    return this.http.post<any>(this.baseUrl + "CreateProduct", data)
  }

  getAllProducts(){
    return this.http.get<any>(this.baseUrl + "GetAllProduct");
  }

  putProduct(data: any, id: number) {
    return this.http.put<any>(this.baseUrl + "UpdateProduct?Id=" + id, data)
  }

  deleteProduct(id: any) {
    return this.http.delete<any>(this.baseUrl + "DeleteProduct?Id=" + id )
  }



}
