package com.skillstorm.inventorymanagementproject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.inventorymanagementproject.models.Inventory;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Integer> {
  
}
