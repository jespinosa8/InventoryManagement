package com.skillstorm.inventorymanagementproject.services;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.skillstorm.inventorymanagementproject.models.Warehouse;
import com.skillstorm.inventorymanagementproject.repositories.WarehouseRepository;

@Service
public class WarehouseService {
  @Autowired
  WarehouseRepository warehouseRepository;

  public List<Warehouse> findAllWarehouses() {

    Sort sort = Sort.by(Sort.Direction.ASC, "id");    // sorts warehouses by id

    return warehouseRepository.findAll(sort);     // calls the findAll() in JpaRepository
  }

  public Warehouse findWarehouseById(Integer id) {

    Optional<Warehouse> warehouse = warehouseRepository.findById(id);

    // if our db has a warehouse with a matching id, return it
    if(warehouse.isPresent()) {
      return warehouse.get();
    }

    // otherwise return null
    return null;
  }

  // Retrieving Top Warehouses by Capacity
  public List<Warehouse> getTopWarehouses() {
    List<Warehouse> warehouses = findAllWarehouses();

    List<Warehouse> topWarehouses = warehouses.stream()
            .sorted(Comparator.comparing(Warehouse::getCapacity).reversed())
            .limit(3)
            .collect(Collectors.toList());
    return topWarehouses;
  }

  public Warehouse saveWarehouse(Warehouse warehouse) {
    return warehouseRepository.save(warehouse);   // performs an isNew() check using PK
  }

  // public int updateWarehouse(Warehouse warehouse, String newLocation) {

  //   return WarehouseRepository.updateWarehouseLocation(warehouse.getId(), newLocation);
  // }

  public void deleteWarehouse(Warehouse warehouse) {
    warehouseRepository.delete(warehouse);
  }
}
