package com.pigalon.lecopain.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;
import com.pigalon.lecopain.domain.enumeration.SubType;
import com.pigalon.lecopain.domain.enumeration.SubscState;

/**
 * A DTO for the Subsc entity.
 */
public class SubscDTO implements Serializable {

    private Long id;

    private Instant startDate;

    private Instant endDate;

    private SubType type;

    private SubscState status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public SubType getType() {
        return type;
    }

    public void setType(SubType type) {
        this.type = type;
    }

    public SubscState getStatus() {
        return status;
    }

    public void setStatus(SubscState status) {
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

        SubscDTO subscDTO = (SubscDTO) o;
        if (subscDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subscDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SubscDTO{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", type='" + getType() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
