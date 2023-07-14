package com.skillstorm.inventorymanagementproject.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.inventorymanagementproject.models.Game;
import com.skillstorm.inventorymanagementproject.services.GameService;

@RestController
@RequestMapping("/games")
@CrossOrigin("*")
public class GameController {
  
  @Autowired
  GameService gameService;

  @GetMapping
  public ResponseEntity<List<Game>> getAllGames() {
    List<Game> games = gameService.findAllGames();

    return ResponseEntity.ok(games);
  }

  @GetMapping("/game/{id}")
  public ResponseEntity<Game> findGameById(@PathVariable int id) {
    Game game = gameService.findGameById(id);

    return ResponseEntity.ok(game);
  }

  @GetMapping("/random")
  public ResponseEntity<List<Game>> getRandomGames(@RequestParam("count") int count) {
    List<Game> randomGames = gameService.getRandomGames(count);

    return ResponseEntity.ok(randomGames);
  } 

  @PostMapping("/game") 
  public ResponseEntity<Game> createMovie(@Valid @RequestBody Game game) {

    Game newGame = gameService.saveGame(game);       
    return new ResponseEntity<Game>(newGame, HttpStatus.CREATED);
  }

 @PutMapping("/game/{id}")
  public ResponseEntity<Game> updateGame(@PathVariable int id, @Valid @RequestBody Game game) {
    Game existingGame = gameService.findGameById(id);
    
    if (existingGame == null) {
      return ResponseEntity.notFound().build();
    }
    
    // Update the existing game with the new values
    existingGame.setName(game.getName());
    existingGame.setDescription(game.getDescription());
    existingGame.setDeveloper(game.getDeveloper());
  
    Game updatedGame = gameService.saveGame(existingGame);
  
    return ResponseEntity.ok(updatedGame);
  } 

  @DeleteMapping("/game/{id}") 
    public ResponseEntity<Game> deleteGame(@PathVariable int id) {
      try {
        gameService.deleteGameById(id); 
      } catch (EmptyResultDataAccessException e) {
        return ResponseEntity.notFound().build();
      }

      return ResponseEntity.noContent().build();
    }
  
}
