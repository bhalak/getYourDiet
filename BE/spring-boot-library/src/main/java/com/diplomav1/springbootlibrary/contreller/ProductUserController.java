package com.diplomav1.springbootlibrary.contreller;

import com.diplomav1.springbootlibrary.entity.ProductUser;
import com.diplomav1.springbootlibrary.service.ProductUserService;
import model.ProductUserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/productUsers")
public class ProductUserController {
    private ProductUserService productUserService;

    @Autowired
    public ProductUserController(ProductUserService productUserService) {
        this.productUserService = productUserService;
    }

    @PutMapping("/update")
    public ProductUser updateProductUser(@RequestParam int id, @RequestBody ProductUserModel productUserModel) throws Exception {

        ProductUser productUser = ProductUserModel.convertModelToEntity(productUserModel, id);
        return productUserService.updateProductUser(productUser);
    }

    @DeleteMapping("/delete")
    public ProductUser deleteProductUser(@RequestParam int id) throws Exception {
        return productUserService.deleteProductUser(id);
    }
}
