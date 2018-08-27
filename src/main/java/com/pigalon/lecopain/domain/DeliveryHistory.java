package com.pigalon.lecopain.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.pigalon.lecopain.domain.enumeration.DeliveryActionType;

/**
 * A DeliveryHistory.
 */
@Entity
@Table(name = "delivery_history")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DeliveryHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "action_date")
    private Instant actionDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "action")
    private DeliveryActionType action;

    @Column(name = "reason")
    private String reason;

    @OneToOne
    @JoinColumn(unique = true)
    private Delivery delivery;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getActionDate() {
        return actionDate;
    }

    public DeliveryHistory actionDate(Instant actionDate) {
        this.actionDate = actionDate;
        return this;
    }

    public void setActionDate(Instant actionDate) {
        this.actionDate = actionDate;
    }

    public DeliveryActionType getAction() {
        return action;
    }

    public DeliveryHistory action(DeliveryActionType action) {
        this.action = action;
        return this;
    }

    public void setAction(DeliveryActionType action) {
        this.action = action;
    }

    public String getReason() {
        return reason;
    }

    public DeliveryHistory reason(String reason) {
        this.reason = reason;
        return this;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Delivery getDelivery() {
        return delivery;
    }

    public DeliveryHistory delivery(Delivery delivery) {
        this.delivery = delivery;
        return this;
    }

    public void setDelivery(Delivery delivery) {
        this.delivery = delivery;
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
        DeliveryHistory deliveryHistory = (DeliveryHistory) o;
        if (deliveryHistory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), deliveryHistory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DeliveryHistory{" +
            "id=" + getId() +
            ", actionDate='" + getActionDate() + "'" +
            ", action='" + getAction() + "'" +
            ", reason='" + getReason() + "'" +
            "}";
    }
}
