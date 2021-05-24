import React from'react';
import {useParams} from "react-router-dom";
import Player from "./Player";


function Room(){
  const {id} = useParams();

    return(
      <div>
          
          <Player 
          roomId={id}
          />
          
        </div>
    )
}

export default Room;