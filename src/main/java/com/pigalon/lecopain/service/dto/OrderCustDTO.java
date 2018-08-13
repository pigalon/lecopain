package com.pigalon.lecopain.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;
import com.pigalon.lecopain.domain.enumeration.OrderState;
import com.pigalon.lecopain.domain.enumeration.PromotionType;

/**
 * A DTO for the OrderCust entity.
 */
public class OrderCustDTO implements Serializable {

    private Long id;

    private String reference;

    private Instant payDate;

    private OrderState status;

    private PromotionType promotion;

    private Long customerId;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OrderCustDTO orderCustDTO = (OrderCustDTO) o;
        if (orderCustDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderCustDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderCustDTO{" +
            "id=" + getId() +
            ", reference='" + getReference() + "'" +
            ", payDate='" + getPayDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", promotion='" + getPromotion() + "'" +
            ", customer=" + getCustomerId() +
            "}";
    }
}
