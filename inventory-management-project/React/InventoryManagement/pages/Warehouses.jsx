import {
  Button,
  Grid,
  GridContainer,
  Modal,
  ModalHeading,
  ModalToggleButton,
} from '@trussworks/react-uswds';
import WarehousesTable from '../src/components/WarehousesTable';
import { useState, useEffect, useRef } from 'react';
import WarehousesForm from '../src/components/WarehousesForm';

export default function Warehouses() {
  const url = 'http://localhost:8282/warehouses';

  // state for our list of warehouses
  const [warehouses, setWarehouses] = useState([]);

  // creating our modal
  const modalRef = useRef(null);

  // make this GET request when the component is mounted to dom
  useEffect(() => {
    
    // fetch will default to a GET request
    fetch(url)
      .then((data) => data.json())
      .then((returnedData) => {
        console.log(returnedData);
        setWarehouses(returnedData);
      })
      .catch((error) => console.error(error));
  }, []); // need to add empty dependency list so it runs on mount only

  function handleNewWarehouse(newWarehouse) {
    setWarehouses((oldState) => {
      return [...oldState, newWarehouse];
    });
  }

  return (
    <>
      <GridContainer>
        <Grid row>
          <Grid col={10}>
            <h1 className="text-centered">All Warehouses</h1>
          </Grid>
          <Grid col={4}>
            <ModalToggleButton modalRef={modalRef} opener>
              Add New Warehouse
            </ModalToggleButton>
          </Grid>
        </Grid>
        <Grid row>
          <Grid col>
            <WarehousesTable tableData={warehouses}></WarehousesTable>
          </Grid>
        </Grid>
      </GridContainer>

      <Modal id="warehouse-form-modal" ref={modalRef}>
        <ModalHeading>Enter New Warehouse Details</ModalHeading>

        <WarehousesForm
          handleNewWarehouse={handleNewWarehouse}
        ></WarehousesForm>
      </Modal>
    </>
  );
}
