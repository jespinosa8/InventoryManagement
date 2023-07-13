import Warehouses from '../pages/Warehouses'
import '@trussworks/react-uswds/lib/index.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Grid, Header, PrimaryNav, Title } from '@trussworks/react-uswds';
import Games from './components/GamesTable';
import Home from '../pages/Home';


export default function App() {

  const navItems = [

    // creating a list of react-router-dom Links to pass to our navbar
    <Link to='/'>Home</Link>,
    <Link to='/warehouses'>Warehouses</Link>,
    <Link to='/games'>Games</Link>

  ]
  
  

  return (
    <>
      <Header basic={true}>
        <Title className="text-center">
          Game Vault Inventory Solutions
        </Title>
      </Header>
      {/**
        REACT ROUTER DOM
            client-side routing - means no page refreshes

            BrowserRouter is going to work with the History API
                gives it access to url and history of your browser so it can navigate between pages
      
            Links and Routes to handle the navigation
                need to be nested inside of your browser router
       */}

      <BrowserRouter basename='/' >
        <Grid row>
          <PrimaryNav items={[navItems]}>

          </PrimaryNav>
        </Grid>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/warehouses' element={<Warehouses />}/>
          <Route path='/games' element={<Games/>}/>
        </Routes>

      </BrowserRouter>

      
    </>
  )
}


