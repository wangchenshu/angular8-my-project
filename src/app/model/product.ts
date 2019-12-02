/**
 * Product - product class
 */
export class Product {
  constructor(
    public ID: number,
    public Name: string,
    public Price: string,
    public Description: string) {
  };
}

/**
* ProductMaker - create new product
*/
export class ProductMaker {
  static create(product: Product) {
    return new Product(
      product.ID,
      product.Name,
      product.Price,
      product.Description
    );
  }
}
