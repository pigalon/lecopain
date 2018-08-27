package com.pigalon.lecopain.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.pigalon.lecopain.domain.enumeration.DeliveryState;

/**
 * A Delivery.
 */
@Entity
@Table(name = "delivery")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Delivery implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "reference")
    private String reference;

    @Column(name = "deliv_date")
    private Instant delivDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private DeliveryState status;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReference() {
        return reference;
    }

    public Delivery reference(String reference) {
        this.reference = reference;
        return this;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public Instant getDelivDate() {
        return delivDate;
    }

    public Delivery delivDate(Instant delivDate) {
        this.delivDate = delivDate;
        return this;
    }

    public void setDelivDate(Instant delivDate) {
        this.delivDate = delivDate;
    }

    public DeliveryState getStatus() {
        return status;
    }

    public Delivery status(DeliveryState status) {
        this.status = status;
        return this;
    }

    public void setStatus(DeliveryState status) {
        this.status = status;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Delivery delivery = (Delivery) o;
        if (delivery.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), delivery.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Delivery{" +
            "id=" + getId() +
            ", reference='" + getReference() + "'" +
            ", delivDate='" + getDelivDate() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
