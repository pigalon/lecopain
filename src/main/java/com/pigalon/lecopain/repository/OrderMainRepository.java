package com.pigalon.lecopain.repository;

import com.pigalon.lecopain.domain.OrderMain;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the OrderMain entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderMainRepository extends JpaRepository<OrderMain, Long> {

}
