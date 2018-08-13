package com.pigalon.lecopain.repository;

import com.pigalon.lecopain.domain.SubHistory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SubHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubHistoryRepository extends JpaRepository<SubHistory, Long> {

}
