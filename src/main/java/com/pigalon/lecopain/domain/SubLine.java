package com.pigalon.lecopain.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A SubLine.
 */
@Entity
@Table(name = "sub_line")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SubLine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "s_reference")
    private String sReference;

    @ManyToOne
    @JsonIgnoreProperties("lines")
    private Subsc subsc;

    @OneToOne
    @JoinColumn(unique = true)
    private OrderMain order;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getsReference() {
        return sReference;
    }

    public SubLine sReference(String sReference) {
        this.sReference = sReference;
        return this;
    }

    public void setsReference(String sReference) {
        this.sReference = sReference;
    }

    public Subsc getSubsc() {
        return subsc;
    }

    public SubLine subsc(Subsc subsc) {
        this.subsc = subsc;
        return this;
    }

    public void setSubsc(Subsc subsc) {
        this.subsc = subsc;
    }

    public OrderMain getOrder() {
        return order;
    }

    public SubLine order(OrderMain orderMain) {
        this.order = orderMain;
        return this;
    }

    public void setOrder(OrderMain orderMain) {
        this.order = orderMain;
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
        SubLine subLine = (SubLine) o;
        if (subLine.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subLine.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SubLine{" +
            "id=" + getId() +
            ", sReference='" + getsReference() + "'" +
            "}";
    }
}
