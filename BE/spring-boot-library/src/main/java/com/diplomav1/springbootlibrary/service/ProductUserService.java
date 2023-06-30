package com.diplomav1.springbootlibrary.service;

import com.diplomav1.springbootlibrary.dao.ProductUserRepository;
import com.diplomav1.springbootlibrary.entity.ProductUser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class ProductUserService {
    private ProductUserRepository productUserRepository;

    public ProductUserService(ProductUserRepository productUserRepository) {
        this.productUserRepository = productUserRepository;
    }

    public ProductUser updateProductUser(ProductUser productUser)
            throws Exception {
        Optional<ProductUser> currentProductUser =
                Optional.ofNullable(productUserRepository.findById(productUser.getId()));

        if (currentProductUser.isEmpty()) {
            throw new Exception(("Product doesn't exist"));
        }

        productUserRepository.save(productUser);

        return currentProductUser.get();
    }

    public ProductUser deleteProductUser(int productUserId) throws Exception {
        Optional<ProductUser> currentProductUser =
                Optional.ofNullable(productUserRepository.findById(productUserId));

        if (currentProductUser.isEmpty()) {
            throw new Exception(("Product doesn't exist"));
        }

        productUserRepository.delete(currentProductUser.get());

        return currentProductUser.get();
    }
}
