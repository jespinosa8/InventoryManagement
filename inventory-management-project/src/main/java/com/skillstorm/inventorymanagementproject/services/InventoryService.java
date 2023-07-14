package com.skillstorm.inventorymanagementproject.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.inventorymanagementproject.models.Game;
import com.skillstorm.inventorymanagementproject.models.Inventory;
import com.skillstorm.inventorymanagementproject.models.Warehouse;
import com.skillstorm.inventorymanagementproject.repositories.GameRepository;
import com.skillstorm.inventorymanagementproject.repositories.InventoryRepository;
import com.skillstorm.inventorymanagementproject.repositories.WarehouseRepository;

@Service
public class InventoryService {  

  @Autowired
  InventoryRepository inventoryRepository;

  @Autowired
  WarehouseRepository warehouseRepository;

  @Autowired
  GameRepository gameRepository;  

  public List<Inventory> viewInventory() {
    return inventoryRepository.findAll();       // retrieves everything in inventory table in db
  }

  public void findByWarehouseIdAndGameId(int warehouseId, int gameId, int desiredQuantity) {
    // Get the Warehouse and Game based on their IDs
    Warehouse warehouse = warehouseRepository.findById(warehouseId).orElse(null);
    Game game = gameRepository.findById(gameId).orElse(null);

    // Check if the Warehouses and Games exist
    if(warehouse != null && game != null) {
      // Check if the Inventory record already exists for the Warehouse and Game combination
      Inventory inventory = inventoryRepository.findByWarehouseIdAndGameId(warehouseId, gameId);
      
      if(inventory != null) {
        // If the Inventory record exists, increment the quantity
        int quantity = inventory.getQuantity() + desiredQuantity;
        inventory.setQuantity(quantity);
      } else {
        // If the Inventory record doesn't exist, create a new one with the initial quantity
        inventory = new Inventory();
        inventory.setWarehouseId(warehouseId);
        inventory.setGameId(gameId);
        inventory.setQuantity(desiredQuantity);
      }

      // Save the Inventory record
      inventoryRepository.save(inventory); 
    }

  }
  
  // Delete an Inventory Record
  public void deleteInventory(int warehouseId, int gameId) {
      // Get the Warehouse and Game based on their IDs
    Warehouse warehouse = warehouseRepository.findById(warehouseId).orElse(null);
    Game game = gameRepository.findById(gameId).orElse(null);

    // Check if the Warehouses and Games exist
    if(warehouse != null && game != null) {
      // Check if the Inventory record already exists for the Warehouse and Game combination
      Inventory inventory = inventoryRepository.findByWarehouseIdAndGameId(warehouseId, gameId);

      if(inventory != null) {
        // If the Inventory record exists, grab the quantity
        int quantity = inventory.getQuantity();
        
        // Subtract quantity from warehouse capacity
        int currentCapacity = warehouse.getCapacity();
        int newCapacity = currentCapacity + quantity;

        // Update warehouse capacity
        warehouse.setCapacity(newCapacity);
      }
      //Delete the inventory record
      inventoryRepository.delete(inventory);
    }                

  }
  
}
