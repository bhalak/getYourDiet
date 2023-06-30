package com.diplomav1.springbootlibrary.contreller;

import com.diplomav1.springbootlibrary.entity.Dish;
import com.diplomav1.springbootlibrary.entity.Product;
import com.diplomav1.springbootlibrary.entity.ProductDish;
import com.diplomav1.springbootlibrary.service.DishService;
import com.diplomav1.springbootlibrary.service.ProductDishService;
import com.diplomav1.springbootlibrary.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import model.DishModel;
import model.DishModelWithId;
import model.Ingredient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/dishes")
public class DishController {
    private ProductService productService;
    private DishService dishService;
    private ProductDishService productDishService;

    @Autowired
    public DishController(ProductService productService, DishService dishService, ProductDishService productDishService) {
        this.productService = productService;
        this.dishService = dishService;
        this.productDishService = productDishService;
    }

    @GetMapping("get")
    public List<DishModelWithId> getDishes() throws Exception {
        List<Dish> dishEntityList = dishService.getAll();
        List<DishModelWithId> dishModels = new ArrayList<>();

        dishEntityList.forEach(dishEntity -> {
            List<ProductDish> productDishes = productDishService.getAll(dishEntity.getId());

            List<Ingredient> ingredients = new ArrayList<>();
            productDishes.forEach(productDish -> {
                String ingredientName = productService.getProductById(productDish.getProductId()).getName();
                Ingredient ingredient = new Ingredient(ingredientName, productDish.getWeight(),
                        productDish.getQuantity());

                ingredients.add(ingredient);
            });

            boolean hasMeat = dishEntity.getHasMeat() != 0;
            DishModelWithId dishModel = new DishModelWithId(
                    dishEntity.getId(),
                    dishEntity.getImg(),
                    dishEntity.getName(),
                    dishEntity.getDescription(),
                    dishEntity.getRecommendations(),
                    hasMeat,
                    dishEntity.getCourseType(),
                    ingredients
            );

            dishModels.add(dishModel);
        });

        return dishModels;
    }

    @PostMapping("/add")
    public DishModel addDish(HttpServletRequest request) throws Exception {

        DishModel dishModel = getModelFromRequest(request);

        Byte hasMeatByte = (dishModel.isHasMeat()) ? (byte) 1 : (byte) 0;
        Dish dish = new Dish(dishModel.getName(), dishModel.getImg(), hasMeatByte, dishModel.getByCourse(),
                dishModel.getDescription(), dishModel.getRecommendations());


        int dishId = dishService.addDish(dish);

        ProductDish productDish;
        for(int i = 0; i < dishModel.getIngredients().size(); i++) {
            Product product = new Product(dishModel.getIngredients().get(i).getIngredientName(),
                    "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg", (byte) 0);
            int productId = productService.addProduct(product);

            productDish = new ProductDish(productId, dishId, dishModel.getIngredients().get(i).getWeight(),
                    dishModel.getIngredients().get(i).getQuantity());
            productDishService.addProductDish(productDish);
        }


        return dishModel;
    }

    private DishModel getModelFromRequest(HttpServletRequest request) throws Exception {
        StringBuilder requestBody = new StringBuilder();

        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                requestBody.append(line);
            }
        }

        ObjectMapper objectMapper = new ObjectMapper();
        DishModel dish = objectMapper.readValue(requestBody.toString(), DishModel.class);
        return dish;
    }
}
