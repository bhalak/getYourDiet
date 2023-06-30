package com.diplomav1.springbootlibrary.contreller;

import com.diplomav1.springbootlibrary.entity.Product;
import com.diplomav1.springbootlibrary.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PutMapping("/update")
    public Product updateProduct(HttpServletRequest request) throws Exception {
        StringBuilder requestBody = new StringBuilder();

        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                requestBody.append(line);
            }
        }

        ObjectMapper objectMapper = new ObjectMapper();
        Product product = objectMapper.readValue(requestBody.toString(), Product.class);

        return productService.updateProduct(product);
    }
}
