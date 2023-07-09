package com.skillstorm.inventorymanagementproject.models;

import java.io.Serializable;

import lombok.Data;

@Data public class InventoryId implements Serializable {
  
  private Integer warehouseId;
  private Integer gameId;
}
