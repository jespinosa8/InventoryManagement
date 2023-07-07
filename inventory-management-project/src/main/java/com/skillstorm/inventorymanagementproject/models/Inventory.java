package com.skillstorm.inventorymanagementproject.models;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import lombok.*;


@Entity
@Table(name = "inventory")
@IdClass(InventoryId.class)         // represents the composite key instead of using @ManyToOne & @JoinColumn
@Data public class Inventory { 
  
  @Id 
  @Column(name = "warehouse_id") 
  private Integer warehouseId;

  @Id  
  @Column(name = "game_id") 
  private Integer gameId;

  @Column
  private Integer quantity;
}
