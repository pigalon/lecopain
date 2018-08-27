package com.pigalon.lecopain.service.mapper;

import com.pigalon.lecopain.domain.*;
import com.pigalon.lecopain.service.dto.DeliveryHistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity DeliveryHistory and its DTO DeliveryHistoryDTO.
 */
@Mapper(componentModel = "spring", uses = {DeliveryMapper.class})
public interface DeliveryHistoryMapper extends EntityMapper<DeliveryHistoryDTO, DeliveryHistory> {

    @Mapping(source = "delivery.id", target = "deliveryId")
    DeliveryHistoryDTO toDto(DeliveryHistory deliveryHistory);

    @Mapping(source = "deliveryId", target = "delivery")
    DeliveryHistory toEntity(DeliveryHistoryDTO deliveryHistoryDTO);

    default DeliveryHistory fromId(Long id) {
        if (id == null) {
            return null;
        }
        DeliveryHistory deliveryHistory = new DeliveryHistory();
        deliveryHistory.setId(id);
        return deliveryHistory;
    }
}
