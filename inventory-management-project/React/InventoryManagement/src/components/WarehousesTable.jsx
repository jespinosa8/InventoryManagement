import { Alert, Button, Table, TextInput } from "@trussworks/react-uswds";
import { useState } from "react";


export default function MoviesTable({tableData}) {
  const URL = 'http://localhost:8282/warehouses';

  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);
  const [editingWarehouseId, setEditingWarehouseId] = useState(null);
  const [editedWarehouse, setEditedWarehouse] = useState({});

  // HANDLE FOR UPDATING WAREHOUSE
  
  const handleUpdate = () => {
    // Perform the update on the backend
    fetch(`${URL}/warehouse`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedWarehouse),
    })
    .then((response) => {
      if (response.ok) {
        console.log("Warehouse updated successfully");
        // Refresh the warehouse data after deletion
        // You can make a GET request or update the local state accordingly
      } else {
        console.error("Failed to update warehouse");
      }
    })
    .catch((error) => {
      console.error("Error occurred during warehouse update:", error);
    });
    
  }
  
    // Handle what happens when u click Edit button
  const handleEdit = (warehouseId) => {
    setEditingWarehouseId(warehouseId);
    const warehouse = tableData.find((w) => w.id === warehouseId);
    setEditedWarehouse(warehouse);
  }

  const handleCancelEdit = () => {
    setEditingWarehouseId(null);
    setEditedWarehouse({});
  };

  const renderEditButtons = (warehouseId) => {
    if (editingWarehouseId === warehouseId) {
      return (
        <>
          <Button onClick={handleUpdate}>Confirm</Button>
          <Button onClick={handleCancelEdit}>Cancel</Button>
        </>
      );
    } else {
      return (
        <>
          <Button onClick={() => handleEdit(warehouseId)}>Edit</Button>
          <Button onClick={() => handleDelete(warehouseId)}>Delete</Button>
        </>
      );
    }
  };

  const handleFieldChange = (e, field) => {
    const { value } = e.target;
    setEditedWarehouse((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // HANDLE FOR DELETING WAREHOUSE 

  const handleConfirmDelete = (warehouseId) => {
    // Perform the deletion on the backend
    fetch(`${URL}/${warehouseId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Warehouse deleted successfully");
          // Refresh the warehouse data after deletion
          // You can make a GET request or update the local state accordingly
        } else {
          console.error("Failed to delete warehouse");
        }
      })
      .catch((error) => {
        console.error("Error occurred during warehouse deletion:", error);
      });

    setDeleteConfirmationId(null);
  };

  

  // Handle what happens when u click Delete button
  const handleDelete = (warehouseId) => {
    setDeleteConfirmationId(warehouseId);
  }

  // Handle Cancel button
  const handleCancelDelete = () => {
    setDeleteConfirmationId(null);
  }

  const renderDeleteButtons = (warehouseId) => {
    if (deleteConfirmationId === warehouseId) {
      return (
        <>
          <Alert className="small-alert" type="warning" role="alert">
            Are you sure you want to delete this warehouse?
          </Alert>
          <Button onClick={() => handleConfirmDelete(warehouseId)} secondary>
            Confirm
          </Button>
          <Button onClick={handleCancelDelete}>Cancel</Button>
        </>
      );
    } else {
      return (
        <>
          <Button onClick={() => handleUpdate(warehouseId)}>Edit</Button>
          <Button onClick={() => handleDelete(warehouseId)} secondary>Delete</Button>
        </>

      );
    }
  };

  return (
    <>
      <Table striped fullWidth className="bg-primary-lighter">

        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Capacity</th> 
            <th>Action</th>         
          </tr>
        </thead>
        <tbody>
          {tableData.map((warehouse) => {
            return  (
              <tr key={warehouse.id}> 
              {/** need to set the key so react knows what elements in the DOM to modify */}
              <td>
                  {editingWarehouseId === warehouse.id ? (
                    <TextInput
                      name="name"
                      value={editedWarehouse.name || ""}
                      onChange={(e) => handleFieldChange(e, "name")}
                    />
                  ) : (
                    warehouse.name
                  )}
                </td>
                <td>
                  {editingWarehouseId === warehouse.id ? (
                    <TextInput
                      name="location"
                      value={editedWarehouse.location || ""}
                      onChange={(e) => handleFieldChange(e, "location")}
                    />
                  ) : (
                    warehouse.location
                  )}
                </td>
                <td>
                  {editingWarehouseId === warehouse.id ? (
                    <TextInput
                      name="capacity"
                      type="number"
                      value={editedWarehouse.capacity || ""}
                      onChange={(e) => handleFieldChange(e, "capacity")}
                    />
                  ) : (
                    warehouse.capacity
                  )}
                </td>

                <td>
                  {editingWarehouseId === warehouse.id
                    ? renderEditButtons(warehouse.id)
                    : renderDeleteButtons(warehouse.id)}
                </td>
               
              </tr>
            );
          })}
        </tbody>

      </Table>

      {/* CSS Styles */}
      <style>
        {`
          .small-alert {
            font-size: 14px;
            padding: 5px 10px;
            margin-bottom: 15px;
          }
        `}
      </style>
    </>
  )
}