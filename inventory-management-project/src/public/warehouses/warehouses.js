// URL to fetch my warehouse data
const warehousesURL = 'http://localhost:8282/warehouses';
const warehouseTable = document.getElementById('warehouse-table');

// Fetching data
document.addEventListener('DOMContentLoaded', () => {
  fetch(warehousesURL)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((warehouse) => {
        const row = createWarehouseRow(warehouse);
        warehouseTable.appendChild(row);
      });
    })
    .catch((error) => {
      console.log('Error retrieving warehouse data:', error);
    });

    const addButton = createActionButton('Add Warehouse', () => {
      showAddForm();
    });
    warehouseTable.insertAdjacentElement('afterend', addButton);
});

// Creating table
function createWarehouseRow(warehouse) {
  const row = document.createElement('tr');

  const nameCell = createTableCell(warehouse.name);
  row.appendChild(nameCell);

  const locationCell = createTableCell(warehouse.location);
  row.appendChild(locationCell);

  const capacityCell = createTableCell(warehouse.capacity);
  row.appendChild(capacityCell);

  const actionsCell = document.createElement('td');

  const editButton = createActionButton('Edit', () => {
    // Handle edit action
    console.log('Edit clicked for warehouse:', warehouse);
  });
  actionsCell.appendChild(editButton);

  const deleteButton = createActionButton('Delete', () => {
    // Handle delete action
    console.log('Delete clicked for warehouse:', warehouse);
  });
  actionsCell.appendChild(deleteButton);

  row.appendChild(actionsCell);

  return row;
}

function createTableCell(text) {
  const cell = document.createElement('td');
  cell.textContent = text;
  return cell;
}

function createActionButton(text, onClick) {
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', onClick);
  return button;
}

function showAddForm() {
  // Clear existing form content if any
  warehouseForm.innerHTML = '';

  const form = document.createElement('form');
  form.addEventListener('submit', event => {
    event.preventDefault();

    // Get input values
    const nameInput = form.querySelector('#name-input');
    const locationInput = form.querySelector('#location-input');
    const capacityInput = form.querySelector('#capacity-input');

    // Create new warehouse object
    const newWarehouse = {
      name: nameInput.value,
      location: locationInput.value,
      capacity: parseInt(capacityInput.value),
    };

    // Perform API call to save new warehouse
    fetch(warehousesURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newWarehouse),
    })
      .then(response => response.json())
      .then(savedWarehouse => {
        // Add new warehouse to the table
        const newRow = createWarehouseRow(savedWarehouse);
        warehouseTable.appendChild(newRow);

        // Reset form fields
        form.reset();
      })
      .catch(error => {
        console.log('Error adding warehouse:', error);
      });
  });
}

 // Create form fields for adding a warehouse
 const nameLabel = document.createElement('label');
 nameLabel.textContent = 'Name:';
 form.appendChild(nameLabel);

 const nameInput = createTextInput('name', 'name-input');
 form.appendChild(nameInput);

 const locationLabel = document.createElement('label');
 locationLabel.textContent = 'Location:';
 form.appendChild(locationLabel);

 const locationInput = createTextInput('location', 'location-input');
 form.appendChild(locationInput);

 const capacityLabel = document.createElement('label');
 capacityLabel.textContent = 'Capacity:';
 form.appendChild(capacityLabel);

 const capacityInput = createTextInput('capacity', 'capacity-input');
 form.appendChild(capacityInput);

 const addButton = createActionButton('Add', () => {
   form.dispatchEvent(new Event('submit'));
 });
 form.appendChild(addButton);

 warehouseForm.appendChild(form);
 warehouseForm.classList.remove('hidden'); // Show the form

