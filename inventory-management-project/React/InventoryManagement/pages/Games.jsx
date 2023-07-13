import { Grid } from "@trussworks/react-uswds";
import { useEffect, useState } from "react";
import GamesTable from "../components/GamesTable";


export default function Games () {

  const url = 'http://localhost:8282/games';

  const [games, setGames] = useState([]);

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

  return (
    <>
      <Grid row>
          <Grid col>
            <h1 className="text-centered">All Games</h1>
          </Grid>
          <Grid col>            
              New Warehouse            
          </Grid>
        </Grid>
        <Grid row>
          <Grid col>
            <GamesTable tableData={games}></GamesTable>
          </Grid>
        </Grid>
    </>
  )
}