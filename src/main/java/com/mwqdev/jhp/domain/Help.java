package com.mwqdev.jhp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Help.
 */
@Entity
@Table(name = "help")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Help implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_entry")
    private String entry;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEntry() {
        return entry;
    }

    public Help entry(String entry) {
        this.entry = entry;
        return this;
    }

    public void setEntry(String entry) {
        this.entry = entry;
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
        Help help = (Help) o;
        if (help.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), help.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Help{" +
            "id=" + getId() +
            ", entry='" + getEntry() + "'" +
            "}";
    }
}
