import {
  Button,
  Grid,
  GridContainer,
  Modal,
  ModalHeading,
  ModalToggleButton,
} from '@trussworks/react-uswds';
import InventoryTable from '../src/components/inventory/InventoryTable';
import { useState, useEffect, useRef } from 'react';
import InventoryForm from '../src/components/inventory/InventoryForm';

export default function Inventory() {
  const url = 'http://localhost:8282/inventory';

  // state for our list of inventory
  const [inventory, setInventory] = useState([]);

  // creating our modal
  const modalRef = useRef(null);

  // make this GET request when the component is mounted to dom
  useEffect(() => {
    
    // fetch will default to a GET request
    fetch(url)
      .then((data) => data.json())
      .then((returnedData) => {
        console.log(returnedData);
        setInventory(returnedData);
      })
      .catch((error) => console.error(error));
  }, []); // need to add empty dependency list so it runs on mount only

  function handleNewInventory(newInventory) {
    setInventory((oldState) => {
      return [...oldState, newInventory];
    });
  }

  return (
    <>
      <GridContainer>
        <Grid row>
          <Grid col={10}>
            <h1 className="text-centered">All Inventory</h1>
          </Grid>
          <Grid col={4}>
            <ModalToggleButton modalRef={modalRef} opener>
              Add New Inventory
            </ModalToggleButton>
          </Grid>
        </Grid>
        <Grid row>
          <Grid col>
            <InventoryTable tableData={inventory}></InventoryTable>
          </Grid>
        </Grid>
      </GridContainer>

      <Modal id="inventory-form-modal" ref={modalRef}>
        <ModalHeading>Enter New Inventory Details</ModalHeading>

        <InventoryForm
          handleNewInventory={handleNewInventory}
        ></InventoryForm>
      </Modal>
    </>
  );
}
