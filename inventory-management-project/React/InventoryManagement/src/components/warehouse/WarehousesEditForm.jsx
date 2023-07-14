import { Button, Label, TextInput } from "@trussworks/react-uswds";
import { Form } from "react-router-dom";


export default function WarehousesUpdateForm({ prevWarehouse, handleUpdate }) {
  const url = 'http://localhost:8282/warehouses';

  useEffect(() => {
    handleUpdate(prevWarehouse);
  }, [prevWarehouse]);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    const updatedWarehouse = {
      id: prevWarehouse.id,
      name: data.get('warehouseName'),
      location: data.get('warehouseLocation'),
      capacity: prevWarehouse.capacity,
    };

    fetch(url + '/warehouse/' + prevWarehouse.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedWarehouse),
    })
      .then(response => response.json())
      .then(returnedData => {
        handleUpdate(returnedData); // Call the prop to update the state in the parent component
        event.target.reset();
      })
      .catch(error => console.error(error));
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="warehouse-name-input">Warehouse Name</Label>
        <TextInput
          id="warehouse-name-input"
          name="warehouseName"
          type="text"
          defaultValue={prevWarehouse.name}
        />

        <Label htmlFor="warehouse-location-input">Warehouse Location</Label>
        <TextInput
          id="warehouse-location-input"
          name="warehouseLocation"
          type="text"
          defaultValue={prevWarehouse.location}
        />

        <Label htmlFor="warehouse-capacity-input">Warehouse Capacity</Label>
        <TextInput
          id="warehouse-capacity-input"
          name="warehouseCapacity"
          type="number"
          defaultValue={prevWarehouse.capacity}
          readOnly // Make the field read-only          
        />

        <Button type="submit" data-close-modal="true">
          Submit
        </Button>
      </Form>
    </>
  );
}