package com.mwqdev.jhp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Base64;
import java.util.Base64.Encoder;
import java.util.Objects;

/**
 * A Foo.
 */
@Entity
@Table(name = "foo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Foo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "file_upload")
    private byte[] fileUpload;

    @Column(name = "file_upload_content_type")
    private String fileUploadContentType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getFileUpload() {
        return fileUpload;
    }

    public Foo fileUpload(byte[] fileUpload) {
        this.fileUpload = fileUpload;
        return this;
    }

    public String getFileUploadString() {
        byte[] fooByte = getFileUpload();
        String fooString = new String(fooByte);
        return fooString;
    }

    public void setFileUpload(byte[] fileUpload) {
        this.fileUpload = fileUpload;
    }

    public String getFileUploadContentType() {
        return fileUploadContentType;
    }

    public Foo fileUploadContentType(String fileUploadContentType) {
        this.fileUploadContentType = fileUploadContentType;
        return this;
    }

    public void setFileUploadContentType(String fileUploadContentType) {
        this.fileUploadContentType = fileUploadContentType;
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
        Foo foo = (Foo) o;
        if (foo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), foo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Foo{" +
            "id=" + getId() +
            ", fileUpload='" + getFileUpload() + "'" +
            ", fileUploadContentType='" + getFileUploadContentType() + "'" +
            "}";
    }
}
