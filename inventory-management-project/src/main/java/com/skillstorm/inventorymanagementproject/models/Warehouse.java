package com.skillstorm.inventorymanagementproject.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import lombok.*;


@Entity
@Table(name = "warehouses")
@Data public class Warehouse {
  
  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "name")
  @NotBlank
  private String name;

  @Column(name = "location")
  @NotBlank
  private String location;  

  @Column(name = "max_capacity")
  @Min(1)
  private Integer capacity;   
  
}
