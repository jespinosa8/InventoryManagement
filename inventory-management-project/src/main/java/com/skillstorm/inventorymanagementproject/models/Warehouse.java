package com.skillstorm.inventorymanagementproject.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Warehouse {
  
  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column(name = "location")
  private String location;  

  @Column(name = "max_capacity")
  private int capacity;  

  public Warehouse(String location, int capacity) {
    this.location = location;
    this.capacity = capacity;
  }  
  
}
