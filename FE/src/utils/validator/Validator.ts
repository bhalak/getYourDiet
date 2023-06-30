export class Validator {
  public static isValidName(str: string): boolean {
    const regex = /^(?!.{256})[a-zA-Z -]{3,}$/;
    return regex.test(str.trim());
  }

  public static isValidWeight(value: string): boolean {
    if (value === "") {
      return true;
    }

    if (typeof value != "string" || value.length > 255) {
      return false;
    }

    const parsedValue = parseFloat(value);
    return !isNaN(parsedValue) && parsedValue > 0;
  }

  public static isValidQuantity(value: string): boolean {
    if (value === "") {
      return true;
    }

    if (typeof value != "string" || value.length > 255) {
      return false;
    }

    const parsedValue = parseInt(value);
    return !isNaN(parsedValue) && parsedValue > 0;
  }

  public static isValidExpirationDate(value: string): boolean {
    if (value === "") return true;
    return new Date(value).getFullYear() < 2200;
  }

  public static isValidIngredient(str: string): boolean {
    if (str === "") return true;

    const regex = /^(?!.{256})[a-zA-Z -]{3,}$/;
    return regex.test(str.trim());
  }
}
