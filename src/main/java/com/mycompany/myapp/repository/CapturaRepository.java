package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Captura;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Captura entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CapturaRepository extends JpaRepository<Captura, Long> {}
