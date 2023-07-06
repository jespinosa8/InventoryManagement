package com.skillstorm.inventorymanagementproject.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.skillstorm.inventorymanagementproject.models.Game;
import com.skillstorm.inventorymanagementproject.repositories.GameRepository;

@Service
public class GameService {
  
  @Autowired
  GameRepository gameRepository;

  public List<Game> findAllGames() {
    Sort sort = Sort.by(Sort.Direction.ASC, "name");
    return gameRepository.findAll(sort);     // calls the findAll() in JpaRepository
  }
}
