import { Alert, Button, Modal, ModalHeading, Table } from '@trussworks/react-uswds';
import { useEffect, useRef, useState } from 'react';
import WarehousesForm from './WarehousesForm';

export default function WarehousesTable({ tableData }) {
  const URL = 'http://localhost:8282/warehouses';

  const [warehouses, setWarehouses] = useState([]);
  // const [editWarehouseId, setEditWarehouseId] = useState(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);

  // creating our modal
  // const modalRef = useRef(null);

  // HANDLE FOR UPDATING WAREHOUSE
  // const handleEdit = (event, warehouseId) => {
  //   event.preventDefault();
  //   setEditWarehouseId(warehouseId);
  // };

  // HANDLE FOR DELETING WAREHOUSE
  const handleDelete = (warehouseId) => {
    setDeleteConfirmationId(warehouseId);
  };

  const handleConfirmDelete = (warehouseId) => {
    // Perform the deletion on the backend
    fetch(`${URL}/warehouse/${warehouseId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Warehouse deleted successfully');
          window.location.reload();
          const updatedWarehouses = warehouses.filter(
            (warehouse) => warehouse.id !== warehouseId
          );

          setWarehouses(updatedWarehouses);
          setDeleteConfirmationId(null);
          
        } else {
          console.error('Failed to delete warehouse');
        }
      })
      .catch((error) => {
        console.error('Error occurred during warehouse deletion:', error);
      });

    setDeleteConfirmationId(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationId(null);
  };

  const renderDeleteButtons = (warehouseId) => {
    if (deleteConfirmationId === warehouseId) {
      return (
        <>
          <Alert type="warning" role="alert" className="small-alert">
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
          <Button onClick={() => handleDelete(warehouseId)} secondary>
            Delete
          </Button>
        </>
      );
    }
  };

  return (
    <>
      <form>
        <Table striped fullWidth className="bg-primary-lighter">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((warehouse) => {
              return (                
                  <tr key={warehouse.id}>                    
                    <td>{warehouse.name}</td>
                    <td>{warehouse.location}</td>
                    <td>{warehouse.capacity}</td>
                    <td>
                    <Button onClick={(event) => handleEdit(event, warehouse)}>Edit</Button>
                    </td>
                    <td>{renderDeleteButtons(warehouse.id)}</td>
                  </tr>                
              );
            })}
          </tbody>
        </Table>

        {/* <Modal id="edit-warehouse-form-modal" ref={modalRef}>
          <ModalHeading>Enter New Warehouse Details</ModalHeading>

          <WarehousesForm
            editWarehouseId={editWarehouseId}
          />
      </Modal> */}

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
      </form>
    </>
  );
}
