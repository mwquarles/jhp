package com.mwqdev.jhp.service;

import com.mwqdev.jhp.domain.Foo;
import com.mwqdev.jhp.repository.FooRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Foo.
 */
@Service
@Transactional
public class FooService {

    private final Logger log = LoggerFactory.getLogger(FooService.class);

    private final FooRepository fooRepository;

    public FooService(FooRepository fooRepository) {
        this.fooRepository = fooRepository;
    }

    /**
     * Save a foo.
     *
     * @param foo the entity to save
     * @return the persisted entity
     */
    public Foo save(Foo foo) {
        log.debug("Request to save Foo : {}", foo);
        String fooString = foo.getFileUploadString();
        log.debug("Foo string test " + fooString);
        return fooRepository.save(foo);
    }

    /**
     * Get all the foos.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Foo> findAll() {
        log.debug("Request to get all Foos");
        return fooRepository.findAll();
    }

    /**
     * Get one foo by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Foo findOne(Long id) {
        log.debug("Request to get Foo : {}", id);
        return fooRepository.findOne(id);
    }

    /**
     * Delete the foo by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Foo : {}", id);
        fooRepository.delete(id);
    }
}
