package com.pigalon.lecopain.repository;

import java.util.Optional;

import com.pigalon.lecopain.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {

    Optional<Authority> findByName(String name);

    void deleteByName(String name);
}
