import { DateUtils } from "../date/DateUtils";
import { GlobalVariables } from "../data-sets/GlobalVariables";

export class ProductModel {
  id: number;
  name: string;
  expirationDateStr: string;
  shouldShowDate: boolean;
  isExpired: boolean;
  expiresSoon: boolean;
  weight?: number;
  quantity?: number;
  individually: boolean;
  imgSrc: string;

  constructor(
    id: number,
    name: string,
    imgSrc: string = GlobalVariables.defaultPictureSrc,
    individually: boolean,
    expirationDate?: string,
    weight?: number,
    quantity?: number
  ) {
    this.id = id;
    this.name = name;
    this.weight = weight;
    this.quantity = quantity;
    this.imgSrc = imgSrc;
    this.individually = individually;
    if (expirationDate) {
      this.expirationDateStr = expirationDate;
      this.shouldShowDate = true;
      this.isExpired = this.isSpoiled(expirationDate);
      this.expiresSoon = this.spoilsSoon(expirationDate);
    } else {
      this.expirationDateStr = "";
      this.shouldShowDate = false;
      this.isExpired = false;
      this.expiresSoon = false;
    }
  }

  private isSpoiled(expirationDateStr: string): boolean {
    const expirationDate: Date = DateUtils.dateToEpoch(
      new Date(expirationDateStr)
    );
    return (
      DateUtils.compareDates(
        expirationDate,
        DateUtils.dateToEpoch(new Date())
      ) < 0
    );
  }

  private spoilsSoon(expirationDateStr: string): boolean {
    const expirationDate: Date = DateUtils.dateToEpoch(
      new Date(expirationDateStr)
    );
    const daysNumberToBeSpoiled: number = 3;
    const currentDate: Date = DateUtils.dateToEpoch(new Date());
    const futureDateNumber: number = currentDate.setDate(
      currentDate.getDate() + daysNumberToBeSpoiled
    );
    const futureDate: Date = new Date(futureDateNumber);
    const isExpiratinLessThanFuture: boolean =
      DateUtils.compareDates(futureDate, expirationDate) === 1;
    return !this.isExpired && isExpiratinLessThanFuture;
  }
}
