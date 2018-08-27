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
 * A OrderMain.
 */
@Entity
@Table(name = "order_main")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OrderMain implements Serializable {

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

    @OneToOne
    @JoinColumn(unique = true)
    private Delivery delivery;

    @OneToMany(mappedBy = "orderMain")
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

    public OrderMain reference(String reference) {
        this.reference = reference;
        return this;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public Instant getPayDate() {
        return payDate;
    }

    public OrderMain payDate(Instant payDate) {
        this.payDate = payDate;
        return this;
    }

    public void setPayDate(Instant payDate) {
        this.payDate = payDate;
    }

    public OrderState getStatus() {
        return status;
    }

    public OrderMain status(OrderState status) {
        this.status = status;
        return this;
    }

    public void setStatus(OrderState status) {
        this.status = status;
    }

    public PromotionType getPromotion() {
        return promotion;
    }

    public OrderMain promotion(PromotionType promotion) {
        this.promotion = promotion;
        return this;
    }

    public void setPromotion(PromotionType promotion) {
        this.promotion = promotion;
    }

    public Customer getCustomer() {
        return customer;
    }

    public OrderMain customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Delivery getDelivery() {
        return delivery;
    }

    public OrderMain delivery(Delivery delivery) {
        this.delivery = delivery;
        return this;
    }

    public void setDelivery(Delivery delivery) {
        this.delivery = delivery;
    }

    public Set<OrderLine> getLines() {
        return lines;
    }

    public OrderMain lines(Set<OrderLine> orderLines) {
        this.lines = orderLines;
        return this;
    }

    public OrderMain addLine(OrderLine orderLine) {
        this.lines.add(orderLine);
        orderLine.setOrderMain(this);
        return this;
    }

    public OrderMain removeLine(OrderLine orderLine) {
        this.lines.remove(orderLine);
        orderLine.setOrderMain(null);
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
        OrderMain orderMain = (OrderMain) o;
        if (orderMain.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderMain.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderMain{" +
            "id=" + getId() +
            ", reference='" + getReference() + "'" +
            ", payDate='" + getPayDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", promotion='" + getPromotion() + "'" +
            "}";
    }
}
