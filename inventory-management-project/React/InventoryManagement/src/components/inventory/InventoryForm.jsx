import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";

export default function InventoryForm({handleNewInventory}) {

    const URL = 'http://localhost:8282/inventory';

    function handleSubmit(event) {
        
        // preventing page refresh
        event.preventDefault();

        // will grab all of the data from our form
        const data = new FormData(event.target);

        // creating movie object
        const newInventory = {
            warehouseId : data.get('warehouseId'),
            gameId : data.get('gameId'),
            quantity : parseInt(data.get('quantity'))
        }

        // sending the post request
        fetch(`${URL}/add-game`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(newInventory)
            })
            .then(data => data.json())
            .then(returnedData => {
                // calling handleNewMovie from Movies.jsx to add the movie to the table
                handleNewInventory(returnedData);

                // resetting the form
                event.target.reset();
            })
            .catch(error => console.error(error));
    }

    return(
        <>
            <Form onSubmit={handleSubmit} >
                <Label htmlFor="inventory-warehouseId-input">Inventory Warehouse ID</Label>
                <TextInput id="inventory-warehouseId-input" name="inventoryWarehouse" type="text"/>

                <Label htmlFor="inventory-gameId-input">Inventory Game ID</Label>
                <TextInput id="inventory-gameId-input" name="movieRating" type="text"/>

                <Label htmlFor="quantity-input">Inventory Quantity</Label>
                <TextInput id="quantity-input" name="inventoryQuantity" type="number"/>                

                <Button type="submit" data-close-modal='true'>Submit</Button>
            </Form>
        </>
    );
}