export class UserProductEntity {
  id: number;
  productId: number;
  userId?: number;
  weight?: number;
  expirationDate?: string;
  quantity?: number;

  constructor(
    id: number,
    productId: number,
    userId?: number,
    weight?: number,
    expirationDate?: string,
    quantity?: number
  ) {
    this.id = id;
    this.userId = userId;
    this.productId = productId;
    this.weight = weight;
    this.expirationDate = expirationDate;
    this.quantity = quantity;
  }
}
