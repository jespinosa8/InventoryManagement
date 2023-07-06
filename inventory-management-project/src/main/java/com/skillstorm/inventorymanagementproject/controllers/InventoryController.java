package com.skillstorm.inventorymanagementproject.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.inventorymanagementproject.models.Inventory;
import com.skillstorm.inventorymanagementproject.services.InventoryService;

@RestController
@RequestMapping("/inventory")
public class InventoryController {
  
  @Autowired
  InventoryService inventoryService;

  @GetMapping
  public ResponseEntity<List<Inventory>> getAllInventory() {
    List<Inventory> inventory = inventoryService.findAllInventory();

    return ResponseEntity.ok(inventory);
  }
}
