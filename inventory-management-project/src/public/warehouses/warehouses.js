const warehousesURL = 'http://localhost:8282/warehouses';   // to pull data from API

document.addEventListener('DOMContentLoaded', () => {
  const manageWarehousesBtn = document.getElementById('manage-warehouses-btn');
  manageWarehousesBtn.addEventListener('click', () => {
    console.log('Button Clicked!');
    window.location.href = '/inventory-management-project/src/public/warehouses/warehouses.html';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const warehouseTable = document.getElementById('warehouse-table');
  fetchWarehouseData().then(data => {
    data.forEach(warehouse => {
      const row = document.createElement('tr');

      const nameCell = document.createElement('td');
      nameCell.textContent = warehouse.name;
      nameCell.classList.add('text-center'); // Center align the text
      row.appendChild(nameCell);

      const locationCell = document.createElement('td');
      locationCell.textContent = warehouse.location;
      locationCell.classList.add('text-center'); // Center align the text
      row.appendChild(locationCell);

      const capacityCell = document.createElement('td');
      capacityCell.textContent = warehouse.capacity;
      capacityCell.classList.add('text-center'); // Center align the text
      row.appendChild(capacityCell);

      const actionsCell = document.createElement('td');
      actionsCell.classList.add('text-center'); // Align content to the center

      // Creating edit & delete buttons
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.classList.add('btn', 'btn-primary', 'me-2');
      actionsCell.appendChild(editButton);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('btn', 'btn-danger');
      actionsCell.appendChild(deleteButton);

      row.appendChild(actionsCell);
      warehouseTable.appendChild(row);
    });
  }).catch(error => {
    console.log('Error retrieving warehouse data:', error);
  });
});

function fetchWarehouseData() {
  return fetch(warehousesURL)
    .then(response => response.json());
}

