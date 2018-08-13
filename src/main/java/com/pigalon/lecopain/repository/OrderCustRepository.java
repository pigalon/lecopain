package com.pigalon.lecopain.repository;

import com.pigalon.lecopain.domain.OrderCust;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the OrderCust entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderCustRepository extends JpaRepository<OrderCust, Long> {

}
