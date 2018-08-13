package com.pigalon.lecopain.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.pigalon.lecopain.domain.enumeration.SubType;

import com.pigalon.lecopain.domain.enumeration.SubscState;

/**
 * A Subsc.
 */
@Entity
@Table(name = "subsc")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Subsc implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "end_date")
    private Instant endDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private SubType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private SubscState status;

    @OneToMany(mappedBy = "subsc")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SubLine> lines = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public Subsc startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public Subsc endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public SubType getType() {
        return type;
    }

    public Subsc type(SubType type) {
        this.type = type;
        return this;
    }

    public void setType(SubType type) {
        this.type = type;
    }

    public SubscState getStatus() {
        return status;
    }

    public Subsc status(SubscState status) {
        this.status = status;
        return this;
    }

    public void setStatus(SubscState status) {
        this.status = status;
    }

    public Set<SubLine> getLines() {
        return lines;
    }

    public Subsc lines(Set<SubLine> subLines) {
        this.lines = subLines;
        return this;
    }

    public Subsc addLine(SubLine subLine) {
        this.lines.add(subLine);
        subLine.setSubsc(this);
        return this;
    }

    public Subsc removeLine(SubLine subLine) {
        this.lines.remove(subLine);
        subLine.setSubsc(null);
        return this;
    }

    public void setLines(Set<SubLine> subLines) {
        this.lines = subLines;
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
        Subsc subsc = (Subsc) o;
        if (subsc.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subsc.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Subsc{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", type='" + getType() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
