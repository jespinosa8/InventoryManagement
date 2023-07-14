import { Table, Alert, Button } from "@trussworks/react-uswds";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';


export default function InventoryTable({tableData}) {
    const URL = 'http://localhost:8282/inventory';

    const [inventory, setInventory] = useState([]);
    const [deleteConfirmationId, setDeleteConfirmationId] = useState({warehouseId: null, gameId: null});

    const handleDelete = (warehouseId, gameId) => {
        setDeleteConfirmationId({warehouseId, gameId});
      };
    
      const handleConfirmDelete = (warehouseId, gameId) => {
        // Perform the deletion on the backend
        fetch(`${URL}/${warehouseId}/${gameId}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              console.log('Inventory record deleted successfully');
    
              window.location.reload();
              const updatedInventory = inventory.filter((inventory) => (inventory.warehouseId !== warehouseId) && (inventory.gameId !== gameId));
              setInventory(updatedInventory);
              setDeleteConfirmationId({warehouseId: null, gameId: null});       
              
            } else {
              console.error('Failed to delete inventory record');
            }
          })
          .catch((error) => {
            console.error('Error occurred during inventory deletion:', error);
          });
    
        setDeleteConfirmationId({ warehouseId: null, gameId: null });
      };
    
      const handleCancelDelete = () => {
        setDeleteConfirmationId({ warehouseId: null, gameId: null });
      };

    const renderDeleteButtons = (warehouseId, gameId) => {
        if (deleteConfirmationId.warehouseId  === warehouseId) {
          return (
            <>
              <Alert type="warning" role="alert" className="small-alert">
                Are you sure you want to delete this game?
              </Alert>
              <Button onClick={() => handleConfirmDelete(warehouseId, gameId)} secondary>
                Confirm
              </Button>
              <Button onClick={handleCancelDelete}>Cancel</Button>
            </>
          );
        } else {
          return (
            <>
              <Button onClick={() => handleDelete(warehouseId, gameId)} secondary>
                Delete
              </Button>
            </>
          );
        }
      };

    return(
        <>
            <Table striped fullWidth className="bg-primary-lighter">

                <thead>
                    <tr>
                        <th>Warehouse ID</th>
                        <th>Game ID</th>
                        <th>Quantity</th> 
                        <th>Actions</th>                       
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((inventory, index) => {
                        return (
                            <tr key={index}> 
                                <td>{inventory.warehouseId}</td>
                                <td>{inventory.gameId}</td> 
                                <td>{inventory.quantity}</td>
                                {/* <Button onClick={(event) => handleEdit(event, warehouse)}>Edit</Button> */}
                                <td>{renderDeleteButtons(inventory.warehouseId, inventory.gameId)}</td>                                                               
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}