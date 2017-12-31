package com.mwqdev.jhp.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Help entity.
 */
public class HelpDTO implements Serializable {

    private Long id;

    private String entry;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEntry() {
        return entry;
    }

    public void setEntry(String entry) {
        this.entry = entry;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        HelpDTO helpDTO = (HelpDTO) o;
        if(helpDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), helpDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HelpDTO{" +
            "id=" + getId() +
            ", entry='" + getEntry() + "'" +
            "}";
    }
}
