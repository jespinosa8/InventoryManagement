// URL to retrieve warehouses data from the backend
const warehousesURL = 'http://localhost:8282/warehouses';

document.addEventListener('DOMContentLoaded', () => {
  const warehousesTable = document.getElementById('warehouses-table');
  populateWarehousesTable(warehousesTable);
});

// Function to populate the warehouses table
function populateWarehousesTable(table) {
  fetch(warehousesURL)
    .then((response) => response.json())
    .then((data) => {
      const tbody = table.querySelector('tbody');

      data.forEach((warehouse) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = warehouse.name;
        row.appendChild(nameCell);

        const locationCell = document.createElement('td');
        locationCell.textContent = warehouse.location;
        row.appendChild(locationCell);

        const capacityCell = document.createElement('td');
        capacityCell.textContent = warehouse.capacity;
        row.appendChild(capacityCell);

        tbody.appendChild(row);
      });
    })
    .catch((error) => {
      console.log('Error retrieving warehouses data:', error);
    });
}

