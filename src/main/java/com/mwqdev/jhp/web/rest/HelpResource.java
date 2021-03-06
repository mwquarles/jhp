package com.mwqdev.jhp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mwqdev.jhp.domain.Help;

import com.mwqdev.jhp.repository.HelpRepository;
import com.mwqdev.jhp.web.rest.errors.BadRequestAlertException;
import com.mwqdev.jhp.web.rest.util.HeaderUtil;
import com.mwqdev.jhp.service.dto.HelpDTO;
import com.mwqdev.jhp.service.mapper.HelpMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Help.
 */
@RestController
@RequestMapping("/api")
public class HelpResource {

    private final Logger log = LoggerFactory.getLogger(HelpResource.class);

    private static final String ENTITY_NAME = "help";

    private final HelpRepository helpRepository;

    private final HelpMapper helpMapper;

    public HelpResource(HelpRepository helpRepository, HelpMapper helpMapper) {
        this.helpRepository = helpRepository;
        this.helpMapper = helpMapper;
    }

    /**
     * POST  /helps : Create a new help.
     *
     * @param helpDTO the helpDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new helpDTO, or with status 400 (Bad Request) if the help has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/helps")
    @Timed
    public ResponseEntity<HelpDTO> createHelp(@RequestBody HelpDTO helpDTO) throws URISyntaxException {
        log.debug("REST request to save Help : {}", helpDTO);
        if (helpDTO.getId() != null) {
            throw new BadRequestAlertException("A new help cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Help help = helpMapper.toEntity(helpDTO);
        help = helpRepository.save(help);
        HelpDTO result = helpMapper.toDto(help);
        return ResponseEntity.created(new URI("/api/helps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /helps : Updates an existing help.
     *
     * @param helpDTO the helpDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated helpDTO,
     * or with status 400 (Bad Request) if the helpDTO is not valid,
     * or with status 500 (Internal Server Error) if the helpDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/helps")
    @Timed
    public ResponseEntity<HelpDTO> updateHelp(@RequestBody HelpDTO helpDTO) throws URISyntaxException {
        log.debug("REST request to update Help : {}", helpDTO);
        if (helpDTO.getId() == null) {
            return createHelp(helpDTO);
        }
        Help help = helpMapper.toEntity(helpDTO);
        help = helpRepository.save(help);
        HelpDTO result = helpMapper.toDto(help);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, helpDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /helps : get all the helps.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of helps in body
     */
    @GetMapping("/helps")
    @Timed
    public List<HelpDTO> getAllHelps() {
        log.debug("REST request to get all Helps");
        List<Help> helps = helpRepository.findAll();
        return helpMapper.toDto(helps);
        }

    /**
     * GET  /helps/:id : get the "id" help.
     *
     * @param id the id of the helpDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the helpDTO, or with status 404 (Not Found)
     */
    @GetMapping("/helps/{id}")
    @Timed
    public ResponseEntity<HelpDTO> getHelp(@PathVariable Long id) {
        log.debug("REST request to get Help : {}", id);
        Help help = helpRepository.findOne(id);
        HelpDTO helpDTO = helpMapper.toDto(help);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(helpDTO));
    }

    /**
     * DELETE  /helps/:id : delete the "id" help.
     *
     * @param id the id of the helpDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/helps/{id}")
    @Timed
    public ResponseEntity<Void> deleteHelp(@PathVariable Long id) {
        log.debug("REST request to delete Help : {}", id);
        helpRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
