package com.skillstorm.inventorymanagementproject.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.*;


@Entity
@Table(name = "warehouses")
@Data public class Warehouse {
  
  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "location")
  private String location;  

  @Column(name = "max_capacity")
  private Integer capacity;   
  
}
