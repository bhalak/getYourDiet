import { ProductModel } from "../models/ProductModel";
import { Endpoints } from "../enums/Endpoints";
import { ProductEntity } from "../entities/ProductEntity";
import { UserProductEntity } from "../entities/UserProductEntity";
import recipesListJson from "../data-sets/recipes-list.json";
import { Ingredient, RecipeModel } from "../models/RecipeModel";

type ProductData = {
  productId: number;
  userId: number;
  weight: number | null;
  expirationDate: string | null;
  quantity: number | null;
};

export class RequestApiUtils {
  public static baseUrl: string = "http://localhost:8080/api";

  public static async getProductsModels(
    userId: number
  ): Promise<ProductModel[]> {
    const fullUserProducts: ProductModel[] = [];
    const products: ProductEntity[] = await this.getProductsEntities();
    const userProducts: UserProductEntity[] =
      await this.getUserProductsEntities(userId);

    userProducts.forEach((userProduct) => {
      const product: ProductEntity = products.find(
        (product) => product.id === userProduct.productId
      )!;

      fullUserProducts.push(
        new ProductModel(
          userProduct.id,
          product.name,
          this.convertBlobToSrc(product.img),
          Boolean(product.individually),
          userProduct.expirationDate,
          userProduct.weight,
          userProduct.quantity
        )
      );
    });

    return fullUserProducts;
  }

  private static convertBlobToSrc(
    blob: string | undefined
  ): string | undefined {
    let imgSrc: string | undefined;
    const reader = new FileReader();
    reader.onload = (event) => {
      imgSrc = event.target?.result as string | undefined;
    };

    if (imgSrc) {
      return imgSrc;
    }

    return blob;
  }

  public static async getProductsEntities(): Promise<ProductEntity[]> {
    const url: string = `${
      this.baseUrl + Endpoints.Products
    }?page=0&size=10000`;
    const response = await this.fetch(url);

    const responseJson = await response.json();
    const responseDate = responseJson._embedded.products;
    const loadedProducts: ProductEntity[] = [];

    for (const key in responseDate) {
      loadedProducts.push(
        new ProductEntity(
          responseDate[key].id,
          responseDate[key].name,
          responseDate[key].img,
          responseDate[key].individually
        )
      );
    }

    return loadedProducts;
  }

  public static async getUserProductsEntities(
    userId: number
  ): Promise<UserProductEntity[]> {
    const url: string = `${
      this.baseUrl + Endpoints.ProductUsers
    }/search/findByUserId?userId=${userId}`;

    const response = await this.fetch(url);

    const responseJson = await response.json();
    const responseDate = responseJson._embedded.productUsers;
    const loadedProductUsers: UserProductEntity[] = [];

    for (const key in responseDate) {
      loadedProductUsers.push(
        new UserProductEntity(
          responseDate[key].id,
          responseDate[key].productId,
          responseDate[key].userId,
          responseDate[key].weight,
          responseDate[key].expirationDate,
          responseDate[key].quantity
        )
      );
    }

    return loadedProductUsers;
  }

  public static async getAllProductNames(): Promise<string[]> {
    return (await this.getProductsEntities()).map((product) => product.name);
  }

  private static async addProductEntity(
    productName: string,
    imgSrc: string,
    individually: number
  ): Promise<number> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: productName,
        img: imgSrc,
        individually: individually,
      }),
    };

    const url: string = `${this.baseUrl + Endpoints.Products}`;
    const response = await this.fetch(url, requestOptions);

    const responseJson = await response.json();
    return responseJson.id;
  }

  public static async updateProductEntity(productEntity: ProductEntity) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productEntity),
    };

    const url: string = `${this.baseUrl + Endpoints.Products}/update;`;

    return await this.fetch(url, requestOptions);
  }

  public static async addUserProductEntity(
    userId: number,
    newProduct: ProductModel
  ) {
    const url: string = `${this.baseUrl + Endpoints.ProductUsers}`;
    return await this.updateOrCreateUserProductEntity(
      "POST",
      url,
      userId,
      newProduct
    );
  }

  public static async updateUserProductEntity(
    userId: number,
    newProduct: ProductModel
  ) {
    const url: string = `${this.baseUrl + Endpoints.ProductUsers}/update?id=${
      newProduct.id
    }`;

    return await this.updateOrCreateUserProductEntity(
      "PUT",
      url,
      userId,
      newProduct
    );
  }

  private static async updateOrCreateUserProductEntity(
    methodName: "POST" | "PUT",
    url: string,
    userId: number,
    newProduct: ProductModel
  ) {
    let productEntityId: number = await this.getProducEntityIdOrCreateNew(
      newProduct.name,
      newProduct.imgSrc,
      +newProduct.individually
    );

    const newProductData: ProductData = {
      productId: productEntityId,
      userId: userId,
      weight: newProduct.weight ? newProduct.weight : null,
      expirationDate: newProduct.expirationDateStr
        ? newProduct.expirationDateStr
        : null,
      quantity: newProduct.quantity ? newProduct.quantity : null,
    };

    const requestOptions = {
      method: methodName,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProductData),
    };

    return await this.fetch(url, requestOptions);
  }

  private static async fetch(url: string, requestOptions?: any) {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    return response;
  }

  private static async getProducEntityIdOrCreateNew(
    name: string,
    imgSrc: string,
    individually: number
  ): Promise<number> {
    let productEntityId: number | undefined = (
      await this.getProductsEntities()
    ).find((product) => product.name === name)?.id;

    if (!productEntityId) {
      productEntityId = await this.addProductEntity(name, imgSrc, individually);
    } else {
      await this.updateProductEntity(
        new ProductEntity(productEntityId, name, imgSrc, individually)
      );
    }

    return productEntityId;
  }

  public static async deleteUserProductEntity(productId: number) {
    const url: string = `${
      this.baseUrl + Endpoints.ProductUsers
    }/delete?id=${productId}`;
    const response = await this.fetch(url, { method: "DELETE" });
    return response.status;
  }

  public static async addRecipesFromDataSets() {
    const url: string = `${this.baseUrl + Endpoints.Dishes}/add`;

    for (const recipeJson of recipesListJson) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeJson),
      };

      console.log(recipeJson);
      await this.fetch(url, requestOptions);
    }
  }

  public static async getRecipesModels(): Promise<RecipeModel[]> {
    const url: string = `${this.baseUrl + Endpoints.Dishes}/get`;

    const response = await this.fetch(url);
    const responseJson = await response.json();

    const recipesModels: RecipeModel[] = [];

    for (const recipeJson of responseJson) {
      const ingredients: Ingredient[] = [];

      for (const ingredientJson of recipeJson.ingredients) {
        const ingredient: Ingredient = new Ingredient(
          ingredientJson.ingredientName,
          ingredientJson.weight,
          ingredientJson.quantity
        );

        ingredients.push(ingredient);
      }

      const recipeModel: RecipeModel = new RecipeModel(
        recipeJson.id,
        recipeJson.img,
        recipeJson.name,
        recipeJson.description,
        recipeJson.recommendations,
        recipeJson.hasMeat,
        recipeJson.byCourse,
        ingredients
      );

      recipesModels.push(recipeModel);
    }

    return recipesModels;
  }

  public static async checkUserExist(
    email: string,
    password: string
  ): Promise<number> {
    const url: string = `${
      this.baseUrl + Endpoints.Users
    }/check?email=${email}&password=${password}`;
    const response = await this.fetch(url);
    const responseJson = await response.json();

    return +responseJson.id;
  }

  public static async createNewUser(
    email: string,
    password: string
  ): Promise<number> {
    const url: string = `${
      this.baseUrl + Endpoints.Users
    }/add?email=${email}&password=${password}`;
    const requestOptions = {
      method: "POST",
    };
    const response = await this.fetch(url, requestOptions);
    const responseJson = await response.json();

    return +responseJson.id;
  }
}
