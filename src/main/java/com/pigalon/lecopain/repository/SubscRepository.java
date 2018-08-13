package com.pigalon.lecopain.repository;

import com.pigalon.lecopain.domain.Subsc;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Subsc entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubscRepository extends JpaRepository<Subsc, Long> {

}
