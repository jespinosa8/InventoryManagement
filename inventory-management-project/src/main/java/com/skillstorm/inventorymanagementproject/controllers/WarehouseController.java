package com.skillstorm.inventorymanagementproject.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

  @GetMapping("/warehouse/{id}")
  public ResponseEntity<Warehouse> findWarehouseById(@PathVariable int id) {
    Warehouse warehouse = warehouseService.findWarehouseById(id);

    return ResponseEntity.ok(warehouse);
  }

  @PostMapping("/warehouse")
  public ResponseEntity<Warehouse> createWarehouse(@Valid @RequestBody Warehouse warehouse) {
    Warehouse newWarehouse = warehouseService.saveWarehouse(warehouse);
    return new ResponseEntity<Warehouse>(newWarehouse, HttpStatus.CREATED);
  }

  @PutMapping("/warehouse")
  public ResponseEntity<Warehouse> updateWarehouse(@RequestBody Warehouse warehouse) {
    Warehouse updatedWarehouse = warehouseService.saveWarehouse(warehouse);

    return new ResponseEntity<Warehouse>(updatedWarehouse, HttpStatus.OK);
  } 

  @DeleteMapping("/warehouse") 
    public ResponseEntity<Warehouse> deleteWarehouse(@RequestBody Warehouse warehouse) {
      warehouseService.deleteWarehouse(warehouse);

      return ResponseEntity.noContent().build();
    }
  
}
