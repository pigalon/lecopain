package com.pigalon.lecopain.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.pigalon.lecopain.domain.enumeration.ProductActionType;

/**
 * A SubHistory.
 */
@Entity
@Table(name = "sub_history")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SubHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "action_date")
    private Instant actionDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "action")
    private ProductActionType action;

    @Column(name = "reason")
    private String reason;

    @OneToOne
    @JoinColumn(unique = true)
    private Subsc subscription;

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

    public SubHistory actionDate(Instant actionDate) {
        this.actionDate = actionDate;
        return this;
    }

    public void setActionDate(Instant actionDate) {
        this.actionDate = actionDate;
    }

    public ProductActionType getAction() {
        return action;
    }

    public SubHistory action(ProductActionType action) {
        this.action = action;
        return this;
    }

    public void setAction(ProductActionType action) {
        this.action = action;
    }

    public String getReason() {
        return reason;
    }

    public SubHistory reason(String reason) {
        this.reason = reason;
        return this;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Subsc getSubscription() {
        return subscription;
    }

    public SubHistory subscription(Subsc subsc) {
        this.subscription = subsc;
        return this;
    }

    public void setSubscription(Subsc subsc) {
        this.subscription = subsc;
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
        SubHistory subHistory = (SubHistory) o;
        if (subHistory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subHistory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SubHistory{" +
            "id=" + getId() +
            ", actionDate='" + getActionDate() + "'" +
            ", action='" + getAction() + "'" +
            ", reason='" + getReason() + "'" +
            "}";
    }
}
