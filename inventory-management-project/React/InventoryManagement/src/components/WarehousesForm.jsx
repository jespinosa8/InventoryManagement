import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";


export default function WarehousesForm({handleNewWarehouse}) {

  const url = 'http://localhost:8282/warehouse';

  function handleSubmit(event) {
    
    // preventing page refresh
    event.preventDefault();

    // will grab all of the data from our form 
    const data = new FormData(event.target);

    const newWarehouse = {
      name: data.get('warehouseName'),    // FormData references the 'name' fields
      location: data.get('warehouseLocation'),
      capacity: parseInt(data.get('warehouseCapacity'))
    }

    // sending the post request
    fetch(`${url}/warehouse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newWarehouse)
    })
    .then(data => data.json())
    .then(returnedData => {
      // calling handleNewWarehouse from Warehouses.jsx to add the movie tot he table
      handleNewWarehouse(returnedData);

      // resetting the form
      event.target.reset();
    }).catch(error => console.error(error));

  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="warehouse-name-input">Warehouse Name</Label>
        <TextInput id="warehouse-name-input" name="warehouseName" type="text"/>

        <Label htmlFor="warehouse-location-input">Warehouse Location</Label>
        <TextInput id="warehouse-location-input" name="warehouseLocation" type="text"/>

        <Label htmlFor="warehouse-capacity-input">Warehouse Capacity</Label>
        <TextInput id="warehouse-capacity-input" name="warehouseCapacity" type="number"/>

        <Button type="submit" data-close-modal="true">Submit</Button>
      </Form>
    </>
  );
}