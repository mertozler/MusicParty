import React, {Component} from "react";
import {
    Grid,
    Typography,
    IconButton,
    Paper
} from "@material-ui/core";
import Spotify from 'spotify-web-api-js';
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import firebase from 'firebase';
import {Heading, Divider} from '@chakra-ui/react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import axios from 'axios';



const spotifyWebApi = new Spotify();


//const Player = props =>
class Player extends Component {
  static defaultProps = {
    roomId: "Bilgi yok",
  }
  constructor(){
    super();
    const params = this.getHashParams(); 
    this.state = {
      logeedIn : params.access_token ? true : false,
      currentStatus: false,
      rooms: {
      roomAdminMail: "",
      roomName: "",
      roomInfo: ""
      }, 
      nowPlaying: {
        artist_name : 'Not Checked',
        song_name: 'Not Checked',
        image: ''
      }
    }
    
    

    this.getNowPlaying = this.getNowPlaying.bind(this);
    this.getRoomInfo = this.getRoomInfo.bind(this);
    

    if(params.access_token){
      spotifyWebApi.setAccessToken(params.access_token);
    }
   
  }

  
  getRoomInfo = () => {
    const {roomId} = this.props;
    const db = firebase.firestore();
    db.collection('rooms').doc(roomId).get()
    .then((doc) => {
        if (doc.exists) {
          this.setState( {
            rooms: {
              roomAdminMail: doc.data().roomAdminMail,
              roomName: doc.data().roomName,
              roomInfo: doc.data().roomInfo
            }
          })
          
        } else {
           console.log("No such document!");
        }
      }
      
    )
  }




  getHashParams() {
   var hashParams = {};
   var e, r = /([^&;=]+)=?([^&;]*)/g,
       q = window.location.hash.substring(1);
   while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
   }
   return hashParams;
  }

 getNowPlaying = () =>{
  spotifyWebApi.getMyCurrentPlayingTrack()
  .then((response) => {
    this.setState({
      nowPlaying: {
        artist_name: response.item.artists[0].name,
        song_name: response.item.name,
        image: response.item.album.images[0].url
      }
    })
  })
   
}

 


componentDidMount(){
    this.getRoomInfo();
    this.getNowPlaying();
    const {roomId} = this.props;

    axios.post('http://localhost:8888/login',{
      roomId: roomId
    })
    .then(res => {
      console.log(`statusCode: ${res.statusCode}`)
      console.log(res)
    })
    .catch(error => {
      console.error(error)
    })
    
    
}

  
    render() {
      const {roomId} = this.props;
      return (


        <Grid container style= {{position: 'absolute', marginTop: 40}}>
        <Grid item sm style={{ marginTop: 10, padding:80, alignItems:"center"}}>
          <Paper>
          <Heading as="h4" size="md" style = {{
             padding: "10px",
             margin: "10px",
             alignItems: "center",
             }}>
           <a href='http://localhost:8888'>
           <button>Login With Spotify</button>
            </a>
          </Heading>
          <Divider orientation="horizontal" />
          

          <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Room admin" secondary={this.state.rooms.roomAdminMail}  />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <MusicNoteIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Room Name" secondary={this.state.rooms.roomName} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <EqualizerIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Room Info" secondary={this.state.rooms.roomInfo}/>
      </ListItem>
          </Paper>
        </Grid>

        <Grid item sm style={{ marginTop: 10, padding:80, alignItems:"center"}}>
        <Paper style= {{ marginTop: 10, marginBottom: 20,alignItems:"center"}}>
          
        
          <Grid item align="center" xs={12} className="now-playing__img">
          <img src={this.state.nowPlaying.image} />
          </Grid>
          
          <Typography item align="center" component="h5" variant="h5">
          {this.state.nowPlaying.song_name}
          </Typography>
          
          <Typography item align="center" color="textSecondary" variant="subtitle1">
              {this.state.nowPlaying.artist_name}
            </Typography>
          <Grid item align="center">
            <IconButton
                onClick={() => { spotifyWebApi.skipToPrevious();
                    {this.getNowPlaying()}
                }}
              >
                <SkipPreviousIcon /> 
              </IconButton>
            <IconButton
                onClick={() => { spotifyWebApi.play();
                    {this.getNowPlaying()}
                }}
              >
                <PlayArrowIcon /> 
              </IconButton>
               
            <IconButton
                onClick={() => { spotifyWebApi.pause();
                    {this.getNowPlaying()}
                }}
              >
                <PauseIcon /> 
              </IconButton>
              <IconButton onClick={() => spotifyWebApi.skipToNext()}>
                {this.getNowPlaying()}
                <SkipNextIcon />
              </IconButton>
          </Grid>

          
        
        
          </Paper>
        </Grid>
      </Grid>
       

        
  );
}
}

export default Player;
