package com.mwqdev.jhp.repository;

import com.mwqdev.jhp.domain.Help;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Help entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HelpRepository extends JpaRepository<Help, Long> {

}
