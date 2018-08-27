package com.pigalon.lecopain.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;
import com.pigalon.lecopain.domain.enumeration.OrderState;
import com.pigalon.lecopain.domain.enumeration.PromotionType;

/**
 * A DTO for the OrderMain entity.
 */
public class OrderMainDTO implements Serializable {

    private Long id;

    private String reference;

    private Instant payDate;

    private OrderState status;

    private PromotionType promotion;

    private Long customerId;

    private Long deliveryId;

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

    public Instant getPayDate() {
        return payDate;
    }

    public void setPayDate(Instant payDate) {
        this.payDate = payDate;
    }

    public OrderState getStatus() {
        return status;
    }

    public void setStatus(OrderState status) {
        this.status = status;
    }

    public PromotionType getPromotion() {
        return promotion;
    }

    public void setPromotion(PromotionType promotion) {
        this.promotion = promotion;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getDeliveryId() {
        return deliveryId;
    }

    public void setDeliveryId(Long deliveryId) {
        this.deliveryId = deliveryId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OrderMainDTO orderMainDTO = (OrderMainDTO) o;
        if (orderMainDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderMainDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderMainDTO{" +
            "id=" + getId() +
            ", reference='" + getReference() + "'" +
            ", payDate='" + getPayDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", promotion='" + getPromotion() + "'" +
            ", customer=" + getCustomerId() +
            ", delivery=" + getDeliveryId() +
            "}";
    }
}
