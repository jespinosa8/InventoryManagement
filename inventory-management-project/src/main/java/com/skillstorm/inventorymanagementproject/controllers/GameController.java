package com.skillstorm.inventorymanagementproject.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.inventorymanagementproject.models.Game;
import com.skillstorm.inventorymanagementproject.services.GameService;

@RestController
@RequestMapping("/games")
public class GameController {
  
  @Autowired
  GameService gameService;

  @GetMapping
  public ResponseEntity<List<Game>> getAllGames() {
    List<Game> games = gameService.findAllGames();

    return ResponseEntity.ok(games);
  }
}
