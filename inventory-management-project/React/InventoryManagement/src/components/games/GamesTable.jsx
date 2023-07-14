import { Alert, Button, Modal, ModalHeading, ModalToggleButton, Table } from '@trussworks/react-uswds';
import { useState } from 'react';
import ReadOnlyGameRow from './ReadOnlyGameRow';
import WarehousesForm from '../warehouse/WarehousesForm';
import { useRef } from 'react';

export default function GamesTable({ tableData }) {
  const URL = 'http://localhost:8282/games';

  const modalRef2 = useRef(null);


  const [games, setGames] = useState([]);
  const [editGame, setEditGame] = useState(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);

  // HANDLE FOR EDITING WAREHOUSE


  // HANDLE FOR DELETING WAREHOUSE

  const handleDelete = (gameId) => {
    setDeleteConfirmationId(gameId);
  };

  const handleConfirmDelete = (gameId) => {
    // Perform the deletion on the backend
    fetch(`${URL}/game/${gameId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Game deleted successfully');
          window.location.reload();
          const updatedGames = games.filter((game) => game.id !== gameId);
          setGames(updatedGames);
          setDeleteConfirmationId(null);        
          
        } else {
          console.error('Failed to delete games');
        }
      })
      .catch((error) => {
        console.error('Error occurred during games deletion:', error);
      });

    setDeleteConfirmationId(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationId(null);
  };

  const renderDeleteButtons = (gameId) => {
    if (deleteConfirmationId === gameId) {
      return (
        <>
          <Alert type="warning" role="alert" className="small-alert">
            Are you sure you want to delete this game?
          </Alert>
          <Button onClick={() => handleConfirmDelete(gameId)} secondary>
            Confirm
          </Button>
          <Button onClick={handleCancelDelete}>Cancel</Button>
        </>
      );
    } else {
      return (
        <>
          <Button onClick={() => handleDelete(gameId)} secondary>
            Delete
          </Button>
        </>
      );
    }
  };

  return (
    <>
      <form>
        <Table striped compact className="bg-primary-lighter">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Developer</th>              
            </tr>
          </thead>
          <tbody>
            {tableData.map((game) => {
              return (
                
                <tr key={game.id}>                  
                  <td>{game.name}</td>
                  <td>{game.description}</td>
                  <td>{game.developer}</td> 
                  <td>
                  <Button onClick={(event) => handleEdit(event, warehouse)}>Edit</Button>
                  </td>                 
                  <td>{renderDeleteButtons(game.id)}</td> 
                </tr>
                
              );
            })}
          </tbody>
        </Table>

         {/* Edit Warehouse Modal
        <Modal id="edit-warehouse-form-modal" ref={modalRef2}>
          <ModalHeading>Edit Warehouse</ModalHeading>

          <WarehousesForm
            handleEdit={handleEdit}
          ></WarehousesForm>
        </Modal>      */}

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
