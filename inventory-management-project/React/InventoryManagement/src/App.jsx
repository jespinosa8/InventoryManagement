import Warehouses from '../pages/Warehouses'
import '@trussworks/react-uswds/lib/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Games from '../pages/Games';

import Inventory from '../pages/Inventory';


export default function App() {  

  return (
    <>    
      <Navbar className="bg-body-tertiary">
        <Container>          
          <Navbar.Brand href="/inventory">Inventory</Navbar.Brand>
          <Navbar.Brand href="/warehouses">Warehouses</Navbar.Brand>
          <Navbar.Brand href="/games">Games</Navbar.Brand>
        </Container>
      </Navbar>

      <BrowserRouter basename='/' >        
        <Routes> 
          <Route path='/' element={<Warehouses />}/>         
          <Route path='/warehouses' element={<Warehouses />}/>
          <Route path='/inventory' element={<Inventory/>}/>
          <Route path='/games' element={<Games/>}/>
        </Routes>
      </BrowserRouter>

      
    </>
  )
}


