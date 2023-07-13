package com.skillstorm.inventorymanagementproject.services;

import java.util.List;
import java.util.Optional;

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
    Sort sort = Sort.by(Sort.Direction.ASC, "id");    // sorts games in alphabetical order
    return gameRepository.findAll(sort);     // calls the findAll() in JpaRepository
  }

  // retrieve games by their id
  public Game findGameById(Integer id) {

    Optional<Game> game = gameRepository.findById(id);

    // if our db has a game with a matching id, return it
    if(game.isPresent()) {
      return game.get();
    }

    // otherwise return null
    return null;
  }

  // retrieve a random list of games 
  public List<Game> getRandomGames(int count) {
    return gameRepository.findRandomGames(count);
  }

  
  public Game saveGame(Game game) {    
    return gameRepository.save(game);
  }

  // method to delete game resource
  public void deleteGameById(int game) {
    gameRepository.deleteById(game);
  }


}
