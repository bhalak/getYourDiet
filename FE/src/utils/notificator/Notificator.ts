import { RequestApiUtils } from "../api/RequestApiUtils";
import { ProductModel } from "../models/ProductModel";
import addNotification from "react-push-notification";
import warningImg from "../../Images/warningImg.png";

export class Notificator {
  private title: string = "WARNING! You need to get rid of some products ASAP.";
  private message: string = "";

  public async notifyUserIfProductsExpire(userId: number) {
    const products: ProductModel[] = await RequestApiUtils.getProductsModels(
      userId
    );
    const spoiledProducts: ProductModel[] = products.filter(
      (product) => product.isExpired
    );
    const toBeSpoiledProducts: ProductModel[] = products.filter(
      (product) => product.expiresSoon
    );

    if (spoiledProducts.length === 0 && toBeSpoiledProducts.length === 0) {
      return;
    }

    if (spoiledProducts.length > 0) {
      this.message += "These products are spoiled:";
      spoiledProducts.forEach(
        (product) =>
          (this.message += `\n\t${product.name} (since ${product.expirationDateStr})`)
      );
    }

    if (toBeSpoiledProducts.length > 0) {
      this.message += "These products will be spoiled soon:";
      spoiledProducts.forEach(
        (product) =>
          (this.message += `\n\t${product.name} (fresh till ${product.expirationDateStr})`)
      );
    }

    addNotification({
      title: this.title,
      message: this.message,
      duration: 4000,
      icon: warningImg,
      native: true,
    });
  }
}
