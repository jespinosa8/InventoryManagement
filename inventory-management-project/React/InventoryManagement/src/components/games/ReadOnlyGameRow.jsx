import { Button, ModalToggleButton } from "@trussworks/react-uswds";
import React from "react";



export default function ReadOnlyGameRow ({ game, renderDeleteButtons, handleEdit }) {

  return (
    <>
       
        {/** need to set the key so react knows what elements in the DOM to modify */}
          <td>{game.name}</td>
          <td>{game.description}</td>
          <td>{game.developer}</td>
          <td>          
            <ModalToggleButton modalRef={modalRef1} opener>
              Add New Warehouse
            </ModalToggleButton>                    
          </td>
          <td>{renderDeleteButtons(game.id)}</td>                   
      
</>
  )
}