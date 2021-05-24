import React, {useState, useEffect} from "react";
import { Button, ListItem, ListItemText } from '@material-ui/core'
import firebase from 'firebase';
import {Link} from 'react-router-dom';
import {GridItem, Heading, Divider} from '@chakra-ui/react';



function HomePage() {


    const[rooms, setRooms] = useState([]);
    const db = firebase.firestore();

    
    

useEffect(() => {
getRooms();

}, []);


function getRooms(){
    db.collection("rooms").onSnapshot(function(querySnapshot){
      setRooms(querySnapshot.docs.map((doc) => ({
        id: doc.id,
        roomName: doc.data().roomName,
        roomInfo: doc.data().roomInfo
      })));
    })
    }

  



 
    return(
        <GridItem
        colStart={"auto"}
        colSpan={[5, null, null, 2, null, null]}
        p={6}
      >
        <Heading as="h1" mb={6}>
            Rooms
            </Heading>
            <Divider orientation="horizontal" />
           {rooms.map((room)=> (
              <ListItem>
              <ListItemText primary={room.roomName} secondary={room.roomInfo}
              />
             
               {/* <Link to={`/room/${room.id}`}></Link> */}
            
                <Link to={`/room/${room.id}`}>

                <Button>Join Room</Button>
               
                {/* <Form action='localhost:8888?roomId=' method="post">
                <input type="hidden" name="roomCodeTxt" value=room.id />
                <input type="submit" value="Join Room" />
                </Form> */}
               
                
               
                </Link>
                
              </ListItem>))}
       </GridItem>
            
    
    );
    

    
    
};


export default HomePage;