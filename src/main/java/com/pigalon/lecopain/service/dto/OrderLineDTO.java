package com.pigalon.lecopain.service.dto;

import java.io.Serializable;
import java.util.Objects;
import com.pigalon.lecopain.domain.enumeration.LineState;

/**
 * A DTO for the OrderLine entity.
 */
public class OrderLineDTO implements Serializable {

    private Long id;

    private String reference;

    private Long quantity;

    private Double price;

    private Double reduction;

    private LineState status;

    private Long orderCustId;

    private Long productId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getReduction() {
        return reduction;
    }

    public void setReduction(Double reduction) {
        this.reduction = reduction;
    }

    public LineState getStatus() {
        return status;
    }

    public void setStatus(LineState status) {
        this.status = status;
    }

    public Long getOrderCustId() {
        return orderCustId;
    }

    public void setOrderCustId(Long orderCustId) {
        this.orderCustId = orderCustId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OrderLineDTO orderLineDTO = (OrderLineDTO) o;
        if (orderLineDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderLineDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderLineDTO{" +
            "id=" + getId() +
            ", reference='" + getReference() + "'" +
            ", quantity=" + getQuantity() +
            ", price=" + getPrice() +
            ", reduction=" + getReduction() +
            ", status='" + getStatus() + "'" +
            ", orderCust=" + getOrderCustId() +
            ", product=" + getProductId() +
            "}";
    }
}
