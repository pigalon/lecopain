package com.pigalon.lecopain.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.pigalon.lecopain.domain.enumeration.OrderState;

import com.pigalon.lecopain.domain.enumeration.PromotionType;

/**
 * A OrderCust.
 */
@Entity
@Table(name = "order_cust")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OrderCust implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "reference")
    private String reference;

    @Column(name = "pay_date")
    private Instant payDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OrderState status;

    @Enumerated(EnumType.STRING)
    @Column(name = "promotion")
    private PromotionType promotion;

    @ManyToOne
    @JsonIgnoreProperties("orders")
    private Customer customer;

    @OneToMany(mappedBy = "orderCust")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<OrderLine> lines = new HashSet<>();

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

    public OrderCust reference(String reference) {
        this.reference = reference;
        return this;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public Instant getPayDate() {
        return payDate;
    }

    public OrderCust payDate(Instant payDate) {
        this.payDate = payDate;
        return this;
    }

    public void setPayDate(Instant payDate) {
        this.payDate = payDate;
    }

    public OrderState getStatus() {
        return status;
    }

    public OrderCust status(OrderState status) {
        this.status = status;
        return this;
    }

    public void setStatus(OrderState status) {
        this.status = status;
    }

    public PromotionType getPromotion() {
        return promotion;
    }

    public OrderCust promotion(PromotionType promotion) {
        this.promotion = promotion;
        return this;
    }

    public void setPromotion(PromotionType promotion) {
        this.promotion = promotion;
    }

    public Customer getCustomer() {
        return customer;
    }

    public OrderCust customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Set<OrderLine> getLines() {
        return lines;
    }

    public OrderCust lines(Set<OrderLine> orderLines) {
        this.lines = orderLines;
        return this;
    }

    public OrderCust addLine(OrderLine orderLine) {
        this.lines.add(orderLine);
        orderLine.setOrderCust(this);
        return this;
    }

    public OrderCust removeLine(OrderLine orderLine) {
        this.lines.remove(orderLine);
        orderLine.setOrderCust(null);
        return this;
    }

    public void setLines(Set<OrderLine> orderLines) {
        this.lines = orderLines;
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
        OrderCust orderCust = (OrderCust) o;
        if (orderCust.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderCust.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderCust{" +
            "id=" + getId() +
            ", reference='" + getReference() + "'" +
            ", payDate='" + getPayDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", promotion='" + getPromotion() + "'" +
            "}";
    }
}
