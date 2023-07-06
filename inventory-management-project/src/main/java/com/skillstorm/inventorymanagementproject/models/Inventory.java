package com.skillstorm.inventorymanagementproject.models;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "inventory")
public class Inventory { 
  
  @Id
  @ManyToOne
  @JoinColumn(name = "warehouse_id")    // indicating warehouse FK
  private Warehouse warehouse;

  @Id
  @ManyToOne
  @JoinColumn(name = "game_id")         // indicating game FK
  private Game game;

  @Column
  private int quantity;
}
