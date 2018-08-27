package com.pigalon.lecopain.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the SubLine entity.
 */
public class SubLineDTO implements Serializable {

    private Long id;

    private String sReference;

    private Long subscId;

    private Long orderId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getsReference() {
        return sReference;
    }

    public void setsReference(String sReference) {
        this.sReference = sReference;
    }

    public Long getSubscId() {
        return subscId;
    }

    public void setSubscId(Long subscId) {
        this.subscId = subscId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderMainId) {
        this.orderId = orderMainId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SubLineDTO subLineDTO = (SubLineDTO) o;
        if (subLineDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subLineDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SubLineDTO{" +
            "id=" + getId() +
            ", sReference='" + getsReference() + "'" +
            ", subsc=" + getSubscId() +
            ", order=" + getOrderId() +
            "}";
    }
}
