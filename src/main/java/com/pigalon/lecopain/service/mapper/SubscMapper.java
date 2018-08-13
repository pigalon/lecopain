package com.pigalon.lecopain.service.mapper;

import com.pigalon.lecopain.domain.*;
import com.pigalon.lecopain.service.dto.SubscDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Subsc and its DTO SubscDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SubscMapper extends EntityMapper<SubscDTO, Subsc> {


    @Mapping(target = "lines", ignore = true)
    Subsc toEntity(SubscDTO subscDTO);

    default Subsc fromId(Long id) {
        if (id == null) {
            return null;
        }
        Subsc subsc = new Subsc();
        subsc.setId(id);
        return subsc;
    }
}
