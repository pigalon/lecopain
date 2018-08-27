package com.pigalon.lecopain.repository;

import com.pigalon.lecopain.domain.DeliveryHistory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DeliveryHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeliveryHistoryRepository extends JpaRepository<DeliveryHistory, Long> {

}
