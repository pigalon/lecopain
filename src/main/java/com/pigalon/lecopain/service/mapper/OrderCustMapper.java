package com.pigalon.lecopain.service.mapper;

import com.pigalon.lecopain.domain.*;
import com.pigalon.lecopain.service.dto.OrderCustDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity OrderCust and its DTO OrderCustDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class})
public interface OrderCustMapper extends EntityMapper<OrderCustDTO, OrderCust> {

    @Mapping(source = "customer.id", target = "customerId")
    OrderCustDTO toDto(OrderCust orderCust);

    @Mapping(source = "customerId", target = "customer")
    @Mapping(target = "lines", ignore = true)
    OrderCust toEntity(OrderCustDTO orderCustDTO);

    default OrderCust fromId(Long id) {
        if (id == null) {
            return null;
        }
        OrderCust orderCust = new OrderCust();
        orderCust.setId(id);
        return orderCust;
    }
}
