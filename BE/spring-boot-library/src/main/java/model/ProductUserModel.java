package model;

import com.diplomav1.springbootlibrary.entity.ProductUser;
import lombok.Data;

import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Optional;

@Data
public class ProductUserModel {
    private int productId;

    private int userId;

    private Float weight;

    private Optional<String> expirationDate;

    private Integer quantity;

    public static ProductUser convertModelToEntity(ProductUserModel userModel, int productUserId) throws Exception {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date;

        if (userModel.expirationDate != null && userModel.expirationDate.isPresent()) {
            date = new Date(dateFormat.parse(userModel.expirationDate.get()).getTime());
        } else {
            date = null;
        }

        return new ProductUser(productUserId, userModel.productId, userModel.userId, userModel.weight, date, userModel.quantity);
    }

    @Override
    public String toString() {
        return "ProductUserModel{" +
                ", productId=" + productId +
                ", userId=" + userId +
                ", weight=" + weight +
                ", expirationDate='" + expirationDate +
                ", quantity= '" + quantity + '\'' +
                '}';
    }
}
