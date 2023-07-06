package com.skillstorm.inventorymanagementproject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.inventorymanagementproject.models.Game;

@Repository
public interface GameRepository extends JpaRepository<Game, Integer> {
  
}
