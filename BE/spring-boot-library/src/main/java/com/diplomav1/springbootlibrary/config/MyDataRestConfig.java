package com.diplomav1.springbootlibrary.config;

import com.diplomav1.springbootlibrary.entity.*;
import model.DishModelWithId;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    private String theAllowedOrigins = "http://localhost:3000";
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        config.exposeIdsFor(Product.class);
        config.exposeIdsFor(User.class);
        config.exposeIdsFor(ProductUser.class);
        config.exposeIdsFor(Dish.class);
        config.exposeIdsFor(ProductDish.class);
        config.exposeIdsFor(DishModelWithId.class);

        // Configure CORS Mapping
        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(theAllowedOrigins);
    }
}
