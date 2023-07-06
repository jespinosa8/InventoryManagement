package com.skillstorm.inventorymanagementproject.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.inventorymanagementproject.models.Inventory;
import com.skillstorm.inventorymanagementproject.repositories.InventoryRepository;

@Service
public class InventoryService {

  @Autowired
  InventoryRepository inventoryRepository;

  public List<Inventory> findAllInventory() {
    return inventoryRepository.findAll();       // retrieves everything in inventory table in db
  }
}
