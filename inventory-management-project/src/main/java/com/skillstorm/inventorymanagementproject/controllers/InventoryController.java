package com.skillstorm.inventorymanagementproject.controllers;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.inventorymanagementproject.models.Inventory;
import com.skillstorm.inventorymanagementproject.services.InventoryService;

@RestController
@RequestMapping("/inventory")
@CrossOrigin("http://127.0.0.1:3001/")
public class InventoryController {
  
  @Autowired
  InventoryService inventoryService;

  @GetMapping
  public ResponseEntity<List<Inventory>> getAllInventory() {
    List<Inventory> inventory = inventoryService.viewInventory();

    return ResponseEntity.ok(inventory);
  }

  @PostMapping("/add-game")
  // public ResponseEntity<String> addGameToWarehouse(@RequestParam Integer warehouseId, @RequestParam Integer gameId, @RequestParam int desiredQuantity) {
  //   inventoryService.findByWarehouseIdAndGameId(warehouseId, gameId, desiredQuantity);

  //   return ResponseEntity.status(HttpStatus.CREATED).body("Game(s) added to warehouse successfully!");
  // }
  public ResponseEntity<String> addGameToWarehouse(@Valid @RequestBody Map<String, Object> request, BindingResult bindingResult) {
    System.out.println(request);
    // Check for validation errors
    if(bindingResult.hasErrors()) {
      return ResponseEntity.badRequest().body("Invalid request payload");
    }
    
    // Extract the values from the request map
    Integer warehouseId = Integer.valueOf(request.get("warehouseId").toString());
    Integer gameId = Integer.valueOf(request.get("gameId").toString());
    int desiredQuantity = Integer.parseInt(request.get("desiredQuantity").toString());
    
    // Process the add game operation
    inventoryService.findByWarehouseIdAndGameId(warehouseId, gameId, desiredQuantity);

    // Return the appropriate response
    return ResponseEntity.status(HttpStatus.CREATED).body("Games added to warehouse successfully.");
}
}
