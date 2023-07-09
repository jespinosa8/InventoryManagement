package com.skillstorm.inventorymanagementproject.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.skillstorm.inventorymanagementproject.models.Game;

@Repository
public interface GameRepository extends JpaRepository<Game, Integer> {
  
  @Query(value = "SELECT * FROM games ORDER BY random() LIMIT :count", nativeQuery = true)
  List<Game> findRandomGames(@Param("count") int count);
}
