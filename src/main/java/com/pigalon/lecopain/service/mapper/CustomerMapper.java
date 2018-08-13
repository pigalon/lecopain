package com.pigalon.lecopain.service.mapper;

import com.pigalon.lecopain.domain.*;
import com.pigalon.lecopain.service.dto.CustomerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Customer and its DTO CustomerDTO.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class})
public interface CustomerMapper extends EntityMapper<CustomerDTO, Customer> {

    @Mapping(source = "location.id", target = "locationId")
    CustomerDTO toDto(Customer customer);

    @Mapping(source = "locationId", target = "location")
    @Mapping(target = "orders", ignore = true)
    Customer toEntity(CustomerDTO customerDTO);

    default Customer fromId(Long id) {
        if (id == null) {
            return null;
        }
        Customer customer = new Customer();
        customer.setId(id);
        return customer;
    }
}
