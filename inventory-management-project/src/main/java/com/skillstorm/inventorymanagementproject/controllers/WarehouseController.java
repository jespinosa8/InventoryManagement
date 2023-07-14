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
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.inventorymanagementproject.models.Warehouse;
import com.skillstorm.inventorymanagementproject.services.WarehouseService;

@RestController
@RequestMapping("/warehouses")
@CrossOrigin("*")
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

  @GetMapping("/top-warehouses")
  public List<Warehouse> getTopWarehouses() {    

    return warehouseService.getTopWarehouses();
  }

  @PostMapping("/warehouse")
  public ResponseEntity<Warehouse> createWarehouse(@Valid @RequestBody Warehouse warehouse) {
    Warehouse newWarehouse = warehouseService.updateOrCreateWarehouse(warehouse);
    return new ResponseEntity<Warehouse>(newWarehouse, HttpStatus.CREATED);
  }

  @PutMapping("/warehouse")
  public ResponseEntity<Warehouse> updateWarehouse(@Valid @RequestBody Warehouse warehouse) {
    Warehouse updatedWarehouse = warehouseService.updateOrCreateWarehouse(warehouse);
    return ResponseEntity.ok(updatedWarehouse);
  }

  @PutMapping("/warehouse/{id}")
  public ResponseEntity<Warehouse> updateWarehouse(@PathVariable int id, @Valid @RequestBody Warehouse warehouse) {
    Warehouse existingWarehouse = warehouseService.findWarehouseById(id);
    
    if (existingWarehouse == null) {
      return ResponseEntity.notFound().build();
    }
    
    // Update the existing warehouse with the new values
    existingWarehouse.setName(warehouse.getName());
    existingWarehouse.setLocation(warehouse.getLocation());
    existingWarehouse.setCapacity(warehouse.getCapacity());
  
    Warehouse updatedWarehouse = warehouseService.updateOrCreateWarehouse(existingWarehouse);
  
    return ResponseEntity.ok(updatedWarehouse);
  } 

  @DeleteMapping("/warehouse/{id}") 
    public ResponseEntity<Warehouse> deleteWarehouse(@PathVariable int id) {
      try {
        warehouseService.deleteWarehouseById(id); 
      } catch (EmptyResultDataAccessException e) {
        return ResponseEntity.notFound().build();
      }

      return ResponseEntity.noContent().build();
    }
  
}
