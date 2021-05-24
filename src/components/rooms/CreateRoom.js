import React, {useState} from'react';

import { Button } from '@material-ui/core';
import fire from 'firebase';
import {
  Heading,
  GridItem,
  Divider,
  Input,
} from '@chakra-ui/react';


function CreateRoom(){
    const db = fire.firestore();

    const [roomNameInput, setRoomNameInput] = useState([]);
    const [roomInfoInput, setRoomInfoInput] = useState([]);

    var user = fire.auth().currentUser;


    function createRoom(e) {
        e.preventDefault();
        db.collection("rooms").add({
            roomName: roomNameInput,
            roomInfo: roomInfoInput,
            roomAdminMail: user.email
        });
        setRoomNameInput("");
        setRoomInfoInput("");
    }

    var styles = {
      padding: "10px",
      margin: "10px",
      
    };
    


    return(
        <GridItem
        colStart={[1, null, null, 2, null, null]}
        colSpan={[3, null, null, 1, null, null]}
        p={6}
      >
            <Heading as="h1" mb={6}>
            Create Room
            </Heading>
            <Divider orientation="horizontal" />
            <form>
            <Heading as="h4" size="md" style = {{ 
               padding: "1px",
               margin: "10px",
               }}>
            Room Name:
            </Heading>
            <Input variant="outline"
             placeholder="Room Name" 
             style = {styles}
             onChange={(e) => setRoomNameInput(e.target.value)}/>
             <Heading as="h4" size="md" style = {
              { padding: "1px",
               margin: "10px",
               }
             }>
            Room Info:
            </Heading>
          
          <Input variant="outline"
           placeholder="Room Info"
           style = {styles}
           onChange={(e) => setRoomInfoInput(e.target.value)} />
          

          <Button
            mt={4}
            colorScheme="teal"
            style = {styles}
            onClick={createRoom}
            type="submit"
          >
            Create a room
          </Button>

    
  

         
          
                
            </form>
        </GridItem>
    )
}

export default CreateRoom;