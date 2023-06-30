package com.diplomav1.springbootlibrary.service;

import com.diplomav1.springbootlibrary.dao.ProductRepository;
import com.diplomav1.springbootlibrary.entity.Product;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class ProductService {
    private ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    public Product getProductByName(String name) {
        return productRepository.findByName(name);
    }

    public Product getProductById(int id) {
        return productRepository.findById(id);
    }
    public Product updateProduct(Product product)
            throws Exception {
        Optional<Product> currentProduct =
                Optional.ofNullable(productRepository.findById(product.getId()));

        if (currentProduct.isEmpty()) {
            throw new Exception(("Product doesn't exist"));
        }

        productRepository.save(product);

        return currentProduct.get();
    }

    public int addProduct(Product product) {
        Optional<Product> newProduct = Optional.ofNullable(productRepository.findByName(product.getName()));
        if (newProduct.isPresent()) {
            return newProduct.get().getId();
        }
        productRepository.save(product);
        return product.getId();
    }

    public int addProduct(String img, String name) {
        Optional<Product> product = Optional.ofNullable(productRepository.findByName(name));
        if (product.isPresent()) {
            return product.get().getId();
        }

        Product newProduct = new Product(name, img, (byte)0);
        productRepository.save(newProduct);

        return newProduct.getId();
    }
}
