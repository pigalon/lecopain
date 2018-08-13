package com.pigalon.lecopain.service.mapper;

import com.pigalon.lecopain.domain.*;
import com.pigalon.lecopain.service.dto.OrderHistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity OrderHistory and its DTO OrderHistoryDTO.
 */
@Mapper(componentModel = "spring", uses = {OrderCustMapper.class})
public interface OrderHistoryMapper extends EntityMapper<OrderHistoryDTO, OrderHistory> {

    @Mapping(source = "order.id", target = "orderId")
    OrderHistoryDTO toDto(OrderHistory orderHistory);

    @Mapping(source = "orderId", target = "order")
    OrderHistory toEntity(OrderHistoryDTO orderHistoryDTO);

    default OrderHistory fromId(Long id) {
        if (id == null) {
            return null;
        }
        OrderHistory orderHistory = new OrderHistory();
        orderHistory.setId(id);
        return orderHistory;
    }
}
