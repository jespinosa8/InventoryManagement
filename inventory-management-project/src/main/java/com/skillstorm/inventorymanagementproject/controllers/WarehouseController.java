package com.skillstorm.inventorymanagementproject.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.inventorymanagementproject.models.Warehouse;
import com.skillstorm.inventorymanagementproject.services.WarehouseService;

@RestController
@RequestMapping("/warehouses")
public class WarehouseController {

  @Autowired
  WarehouseService warehouseService;
  
  @GetMapping
  public ResponseEntity<List<Warehouse>> getAllWarehouses() {
    List<Warehouse> warehouses =  warehouseService.findAllWarehouses();

    return ResponseEntity.ok(warehouses);
  }
}
