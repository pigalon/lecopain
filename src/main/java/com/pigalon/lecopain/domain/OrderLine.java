package com.pigalon.lecopain.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import com.pigalon.lecopain.domain.enumeration.LineState;

/**
 * A OrderLine.
 */
@Entity
@Table(name = "order_line")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OrderLine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "reference")
    private String reference;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "price")
    private Double price;

    @Column(name = "reduction")
    private Double reduction;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private LineState status;

    @ManyToOne
    @JsonIgnoreProperties("lines")
    private OrderCust orderCust;

    @OneToOne
    @JoinColumn(unique = true)
    private Product product;

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

    public OrderLine reference(String reference) {
        this.reference = reference;
        return this;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public Long getQuantity() {
        return quantity;
    }

    public OrderLine quantity(Long quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public OrderLine price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getReduction() {
        return reduction;
    }

    public OrderLine reduction(Double reduction) {
        this.reduction = reduction;
        return this;
    }

    public void setReduction(Double reduction) {
        this.reduction = reduction;
    }

    public LineState getStatus() {
        return status;
    }

    public OrderLine status(LineState status) {
        this.status = status;
        return this;
    }

    public void setStatus(LineState status) {
        this.status = status;
    }

    public OrderCust getOrderCust() {
        return orderCust;
    }

    public OrderLine orderCust(OrderCust orderCust) {
        this.orderCust = orderCust;
        return this;
    }

    public void setOrderCust(OrderCust orderCust) {
        this.orderCust = orderCust;
    }

    public Product getProduct() {
        return product;
    }

    public OrderLine product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
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
        OrderLine orderLine = (OrderLine) o;
        if (orderLine.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderLine.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderLine{" +
            "id=" + getId() +
            ", reference='" + getReference() + "'" +
            ", quantity=" + getQuantity() +
            ", price=" + getPrice() +
            ", reduction=" + getReduction() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
