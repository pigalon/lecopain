package com.pigalon.lecopain.service.mapper;

import com.pigalon.lecopain.domain.*;
import com.pigalon.lecopain.service.dto.OrderLineDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity OrderLine and its DTO OrderLineDTO.
 */
@Mapper(componentModel = "spring", uses = {OrderCustMapper.class, ProductMapper.class})
public interface OrderLineMapper extends EntityMapper<OrderLineDTO, OrderLine> {

    @Mapping(source = "orderCust.id", target = "orderCustId")
    @Mapping(source = "product.id", target = "productId")
    OrderLineDTO toDto(OrderLine orderLine);

    @Mapping(source = "orderCustId", target = "orderCust")
    @Mapping(source = "productId", target = "product")
    OrderLine toEntity(OrderLineDTO orderLineDTO);

    default OrderLine fromId(Long id) {
        if (id == null) {
            return null;
        }
        OrderLine orderLine = new OrderLine();
        orderLine.setId(id);
        return orderLine;
    }
}
