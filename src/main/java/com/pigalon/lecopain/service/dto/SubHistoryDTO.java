package com.pigalon.lecopain.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;
import com.pigalon.lecopain.domain.enumeration.ProductActionType;

/**
 * A DTO for the SubHistory entity.
 */
public class SubHistoryDTO implements Serializable {

    private Long id;

    private Instant actionDate;

    private ProductActionType action;

    private String reason;

    private Long subscriptionId;

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

    public Long getSubscriptionId() {
        return subscriptionId;
    }

    public void setSubscriptionId(Long subscId) {
        this.subscriptionId = subscId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SubHistoryDTO subHistoryDTO = (SubHistoryDTO) o;
        if (subHistoryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subHistoryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SubHistoryDTO{" +
            "id=" + getId() +
            ", actionDate='" + getActionDate() + "'" +
            ", action='" + getAction() + "'" +
            ", reason='" + getReason() + "'" +
            ", subscription=" + getSubscriptionId() +
            "}";
    }
}
