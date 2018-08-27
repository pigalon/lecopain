package com.pigalon.lecopain.service.mapper;

import com.pigalon.lecopain.domain.*;
import com.pigalon.lecopain.service.dto.OrderMainDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity OrderMain and its DTO OrderMainDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class, DeliveryMapper.class})
public interface OrderMainMapper extends EntityMapper<OrderMainDTO, OrderMain> {

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "delivery.id", target = "deliveryId")
    OrderMainDTO toDto(OrderMain orderMain);

    @Mapping(source = "customerId", target = "customer")
    @Mapping(source = "deliveryId", target = "delivery")
    @Mapping(target = "lines", ignore = true)
    OrderMain toEntity(OrderMainDTO orderMainDTO);

    default OrderMain fromId(Long id) {
        if (id == null) {
            return null;
        }
        OrderMain orderMain = new OrderMain();
        orderMain.setId(id);
        return orderMain;
    }
}
