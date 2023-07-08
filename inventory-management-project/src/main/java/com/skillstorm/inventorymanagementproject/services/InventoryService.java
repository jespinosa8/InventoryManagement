package com.skillstorm.inventorymanagementproject.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import com.skillstorm.inventorymanagementproject.models.Inventory;
import com.skillstorm.inventorymanagementproject.models.Warehouse;
import com.skillstorm.inventorymanagementproject.repositories.GameRepository;
import com.skillstorm.inventorymanagementproject.repositories.InventoryRepository;
import com.skillstorm.inventorymanagementproject.repositories.WarehouseRepository;

@Service
public class InventoryService {

  @Autowired
  private WarehouseRepository warehouseRepository;

  @Autowired
  private GameRepository gameRepository;

  @Autowired
  InventoryRepository inventoryRepository;

  public List<Inventory> findAllInventory() {
    return inventoryRepository.findAll();       // retrieves everything in inventory table in db
  }

  public void addGameToWarehouse(Integer warehouseId, Integer gameId, Integer quantity) {
    // check if the warehouse exists
    Optional<Warehouse> warehouse = warehouseRepository.findById(warehouseId);
  }
}
