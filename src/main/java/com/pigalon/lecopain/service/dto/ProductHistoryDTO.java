package com.pigalon.lecopain.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;
import com.pigalon.lecopain.domain.enumeration.ProductActionType;

/**
 * A DTO for the ProductHistory entity.
 */
public class ProductHistoryDTO implements Serializable {

    private Long id;

    private Instant actionDate;

    private ProductActionType action;

    private String reason;

    private Long productId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getActionDate() {
        return actionDate;
    }

    public void setActionDate(Instant actionDate) {
        this.actionDate = actionDate;
    }

    public ProductActionType getAction() {
        return action;
    }

    public void setAction(ProductActionType action) {
        this.action = action;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
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

        ProductHistoryDTO productHistoryDTO = (ProductHistoryDTO) o;
        if (productHistoryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productHistoryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductHistoryDTO{" +
            "id=" + getId() +
            ", actionDate='" + getActionDate() + "'" +
            ", action='" + getAction() + "'" +
            ", reason='" + getReason() + "'" +
            ", product=" + getProductId() +
            "}";
    }
}
