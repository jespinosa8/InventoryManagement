package com.skillstorm.inventorymanagementproject.models;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import javax.validation.constraints.Min;

import lombok.*;


@Entity
@Table(name = "inventory")
@IdClass(InventoryId.class)         // represents the composite key instead of using @ManyToOne & @JoinColumn
@Data public class Inventory { 
  
  @Id 
  @Column(name = "warehouse_id") 
  @Min(1)
  private Integer warehouseId;

  @Id  
  @Column(name = "game_id")
  @Min(1)
  private Integer gameId;

  @Column
  @Min(1)
  private int quantity;
}
