package com.pigalon.lecopain.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;
import com.pigalon.lecopain.domain.enumeration.DeliveryState;

/**
 * A DTO for the Delivery entity.
 */
public class DeliveryDTO implements Serializable {

    private Long id;

    private String reference;

    private Instant delivDate;

    private DeliveryState status;

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

    public Instant getDelivDate() {
        return delivDate;
    }

    public void setDelivDate(Instant delivDate) {
        this.delivDate = delivDate;
    }

    public DeliveryState getStatus() {
        return status;
    }

    public void setStatus(DeliveryState status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DeliveryDTO deliveryDTO = (DeliveryDTO) o;
        if (deliveryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), deliveryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DeliveryDTO{" +
            "id=" + getId() +
            ", reference='" + getReference() + "'" +
            ", delivDate='" + getDelivDate() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
