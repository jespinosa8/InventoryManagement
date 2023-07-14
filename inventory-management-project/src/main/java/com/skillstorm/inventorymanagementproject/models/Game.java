package com.skillstorm.inventorymanagementproject.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import lombok.*;


@Entity
@Table(name = "games")
@Data public class Game {
  
  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column(name = "name")
  @NotBlank 
  private String name;

  @Column(name = "description")
  private String description;

  @Column(name = "developer")
  @NotBlank
  private String developer;  
  
}
