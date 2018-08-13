package com.pigalon.lecopain.repository;

import com.pigalon.lecopain.domain.SubLine;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SubLine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubLineRepository extends JpaRepository<SubLine, Long> {

}
