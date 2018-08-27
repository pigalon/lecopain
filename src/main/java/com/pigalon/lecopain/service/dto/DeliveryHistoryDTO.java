package com.pigalon.lecopain.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;
import com.pigalon.lecopain.domain.enumeration.DeliveryActionType;

/**
 * A DTO for the DeliveryHistory entity.
 */
public class DeliveryHistoryDTO implements Serializable {

    private Long id;

    private Instant actionDate;

    private DeliveryActionType action;

    private String reason;

    private Long deliveryId;

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

    public DeliveryActionType getAction() {
        return action;
    }

    public void setAction(DeliveryActionType action) {
        this.action = action;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
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

        DeliveryHistoryDTO deliveryHistoryDTO = (DeliveryHistoryDTO) o;
        if (deliveryHistoryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), deliveryHistoryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DeliveryHistoryDTO{" +
            "id=" + getId() +
            ", actionDate='" + getActionDate() + "'" +
            ", action='" + getAction() + "'" +
            ", reason='" + getReason() + "'" +
            ", delivery=" + getDeliveryId() +
            "}";
    }
}
