import { Grid, GridContainer, Modal, ModalHeading, ModalToggleButton } from "@trussworks/react-uswds";
import { useEffect, useRef, useState } from "react";
import GamesTable from "../src/components/games/GamesTable";
import GamesForm from "../src/components/games/GamesForm";


export default function Games () {

  const url = 'http://localhost:8282/games';

  const [games, setGames] = useState([]);

  // creating our modal
  const modalRef = useRef(null);

  // make this GET request when the component is mounted to dom
  useEffect(() => {
    // fetch will default to a GET request
    fetch(url)
      .then((data) => data.json())
      .then((returnedData) => {
        console.log(returnedData);
        setGames(returnedData);
      })
      .catch((error) => console.error(error));
  }, []); // need to add empty dependency list so it runs on mount only

  function handleNewGame(newGame) {
    setGames((oldState) => {
      return [...oldState, newGame];
    });
  }

  return (
    <>
      <GridContainer>
        <Grid row>
          <Grid col={10}>
            <h1 className="text-centered">All Games</h1>
          </Grid>
          <Grid col={4}>
            <ModalToggleButton modalRef={modalRef} opener>
              Add New Game
            </ModalToggleButton>
          </Grid>
        </Grid>
        <Grid row>
          <Grid col>
            <GamesTable tableData={games}></GamesTable>
          </Grid>
        </Grid>
      </GridContainer>

      <Modal id="game-form-modal" ref={modalRef}>
        <ModalHeading>Enter New Game Details</ModalHeading>

        <GamesForm
          handleNewGame={handleNewGame}
        ></GamesForm>
      </Modal>
    </>
  )
}