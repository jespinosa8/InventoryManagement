package com.skillstorm.inventorymanagementproject.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.inventorymanagementproject.models.Warehouse;
import com.skillstorm.inventorymanagementproject.repositories.WarehouseRepository;

@RestController
@RequestMapping("/warehouses")
public class WarehouseController {
  
  @GetMapping
  public ResponseEntity<List<Warehouse>> getAllWarehouses() {
    List<Warehouse> warehouses =  WarehouseRepository.get
  }
}
