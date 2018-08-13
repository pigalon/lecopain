package com.pigalon.lecopain.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.pigalon.lecopain.domain.enumeration.OrderActionType;

/**
 * A OrderHistory.
 */
@Entity
@Table(name = "order_history")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OrderHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "action_date")
    private Instant actionDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "action")
    private OrderActionType action;

    @Column(name = "reason")
    private String reason;

    @OneToOne
    @JoinColumn(unique = true)
    private OrderCust order;

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

    public OrderHistory actionDate(Instant actionDate) {
        this.actionDate = actionDate;
        return this;
    }

    public void setActionDate(Instant actionDate) {
        this.actionDate = actionDate;
    }

    public OrderActionType getAction() {
        return action;
    }

    public OrderHistory action(OrderActionType action) {
        this.action = action;
        return this;
    }

    public void setAction(OrderActionType action) {
        this.action = action;
    }

    public String getReason() {
        return reason;
    }

    public OrderHistory reason(String reason) {
        this.reason = reason;
        return this;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public OrderCust getOrder() {
        return order;
    }

    public OrderHistory order(OrderCust orderCust) {
        this.order = orderCust;
        return this;
    }

    public void setOrder(OrderCust orderCust) {
        this.order = orderCust;
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
        OrderHistory orderHistory = (OrderHistory) o;
        if (orderHistory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderHistory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderHistory{" +
            "id=" + getId() +
            ", actionDate='" + getActionDate() + "'" +
            ", action='" + getAction() + "'" +
            ", reason='" + getReason() + "'" +
            "}";
    }
}
