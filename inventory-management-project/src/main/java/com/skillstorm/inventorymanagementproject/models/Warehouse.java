package com.skillstorm.inventorymanagementproject.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

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

  

  public Warehouse() {
  }
  

  public Warehouse(String location, int capacity) {
    this.location = location;
    this.capacity = capacity;
  }



  public Warehouse(int id, String location, int capacity) {
    this.id = id;
    this.location = location;
    this.capacity = capacity;
  }



  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public int getCapacity() {
    return capacity;
  }

  public void setCapacity(int capacity) {
    this.capacity = capacity;
  }


  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + id;
    result = prime * result + ((location == null) ? 0 : location.hashCode());
    result = prime * result + capacity;
    return result;
  }


  @Override
  public boolean equals(Object obj) {
    if (this == obj)
      return true;
    if (obj == null)
      return false;
    if (getClass() != obj.getClass())
      return false;
    Warehouse other = (Warehouse) obj;
    if (id != other.id)
      return false;
    if (location == null) {
      if (other.location != null)
        return false;
    } else if (!location.equals(other.location))
      return false;
    if (capacity != other.capacity)
      return false;
    return true;
  }


  @Override
  public String toString() {
    return "Warehouse [id=" + id + ", location=" + location + ", capacity=" + capacity + "]";
  }  

  
}
