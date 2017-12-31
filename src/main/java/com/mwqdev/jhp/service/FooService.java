package com.mwqdev.jhp.service;

import com.mwqdev.jhp.domain.Bar;
import com.mwqdev.jhp.domain.Foo;
import com.mwqdev.jhp.repository.BarRepository;
import com.mwqdev.jhp.repository.FooRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

/**
 * Service Implementation for managing Foo.
 */
@Service
@Transactional
public class FooService {

    private final Logger log = LoggerFactory.getLogger(FooService.class);

    private final FooRepository fooRepository;

    private final BarRepository barRepository;

    public FooService(FooRepository fooRepository, BarRepository barRepository) {
        this.fooRepository = fooRepository;
        this.barRepository = barRepository;
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
//        log.debug("Foo string test " + fooString);

        List<String> fooList = Arrays.asList(fooString.split("\\s+"));
//        List<String> fooColumns = Arrays.asList(fooList.get(0).split(","));

//        String barSave = "[Bar{";

        for (int i = 1; i < fooList.size(); i++) {

//            log.debug(fooList.get(i));

            List<String> fooItem = Arrays.asList(fooList.get(i).split(","));

//            log.debug(String.valueOf(fooItem));

//            log.debug("[Bar{" + fooColumns.get(0) + "=" + fooItem.get(0) + ", "
//                + fooColumns.get(1) + "='" + fooItem.get(1) + "', "
//                + fooColumns.get(2) + "='" + fooItem.get(2) + "', "
//                + fooColumns.get(3) + "='" + fooItem.get(3) + "', "
//                + fooColumns.get(4) + "='" + fooItem.get(4) + "', "
//                + fooColumns.get(5) + "='" + fooItem.get(5) + "'}");

//            barSave = "[Bar{" + fooColumns.get(0) + "=" + fooItem.get(0) + ", "
//                + fooColumns.get(1) + "='" + fooItem.get(1) + "', "
//                + fooColumns.get(2) + "='" + fooItem.get(2) + "', "
//                + fooColumns.get(3) + "='" + fooItem.get(3) + "', "
//                + fooColumns.get(4) + "='" + fooItem.get(4) + "', "
//                + fooColumns.get(5) + "='" + fooItem.get(5) + "'}]";

//            log.debug(barSave);
            Bar newBar = new Bar();
            String newEntry = String.valueOf(fooItem);
            newBar.entry(newEntry.substring(1, newEntry.length() - 1));
            barRepository.save(newBar);

//            for (int j = 0; j < fooColumns.size(); j++) {
//                if (j == fooColumns.size()) {
//                    barSave = barSave.concat(fooColumns.get(j) + "='" + fooItem.get(j) + "'}");
//                    log.debug(barSave);
//                    barSave = "[Bar{";
//                } else {
//                    barSave = barSave.concat(fooColumns.get(j) + "='" + fooItem.get(j) + "', ");
//                }
//            }
        }
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
