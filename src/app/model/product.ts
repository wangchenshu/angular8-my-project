/**
 * Product - product class
 */
export class Product {
  constructor(
    public id: number,
    public name: string,
    public price: string,
    public description: string) {
  };
}

/**
* ProductMaker - create new product
*/
export class ProductMaker {
  static create(product: Product) {
    return new Product(
      product.id,
      product.name,
      product.price,
      product.description
    );
  }
}
