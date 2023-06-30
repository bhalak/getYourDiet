export class ProductEntity {
  id: number;
  name: string;
  img?: string;
  individually?: number

  constructor(id: number, name: string, imgSrc: string, individually: number) {
    this.id = id;
    this.name = name;
    this.img = imgSrc;
    this.individually = individually;
  }
}
