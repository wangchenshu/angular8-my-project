import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: Product[];

  constructor(
    private _location: Location,
    private productService: ProductService) { }

  ngOnInit() {
  }

  /**
   * getProducts - get all products
   */
  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
      });
  }

  /**
   * clearProducts - clear products
   */
  clearProducts(): void {
    this.products = [];
  }

  /**
   * goBack - go back
   */
  goBack(): void {
    this._location.back();
  }
}
