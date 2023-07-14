import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";


export default function GamesForm({handleNewGame}) {

  const url = 'http://localhost:8282/games';

  function handleSubmit(event) {
    
    // preventing page refresh
    event.preventDefault();

    // will grab all of the data from our form 
    const data = new FormData(event.target);

    const newGame = {
      name: data.get('gameName'),    // FormData references the 'name' fields
      description: data.get('gameDescription'),
      developer: data.get('gameDeveloper')
    }

    // sending the post request
    fetch(`${url}/game`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGame)
    })
    .then(data => data.json())
    .then(returnedData => {
      // calling handleNewGame from Games.jsx to add the movie to the table
      handleNewGame(returnedData);

      // resetting the form
      event.target.reset();
    }).catch(error => console.error(error));

  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="game-name-input">Game Name</Label>
        <TextInput id="game-name-input" name="gameName" type="text"/>

        <Label htmlFor="game-description-input">Game Description</Label>
        <TextInput id="game-description-input" name="gameDescription" type="text"/>

        <Label htmlFor="game-developer-input">Game Developer</Label>
        <TextInput id="game-developer-input" name="gameDeveloper" type="text"/>

        <Button type="submit" data-close-modal="true">Submit</Button>
      </Form>
    </>
  );
}