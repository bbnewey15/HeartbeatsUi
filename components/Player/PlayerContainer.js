import React, {useRef, useState, useEffect, createContext} from 'react';
import {makeStyles, CircularProgress, Grid} from '@material-ui/core';


import cogoToast from 'cogo-toast';

import Util from '../../js/Util';
import Songs from  '../../js/Songs';

import PlayerToolbar from './Toolbar/PlayerToolbar';

//Main Panels
//import MainPlayerContainer from './MainPanels/SongList';

//Extras



var today =  new Date();

export const PlayerContext = createContext(null);

//This is the highest component for the Task Page
//Contains all important props that all tabs use
const PlayerContainer = function(props) {
  const {user, recievedBPM }= props;

  const [activeSongData, setActiveSongData] = useState(null);
  const [songDataRefetch, setSongDataRefetch] = useState(false);

  
  const classes = useStyles();

  const getMainComponent = () =>{
    return <MainPlayerContainer />
  }
  

  return (
    <div className={classes.root}>
      <PlayerContext.Provider value={{activeSongData, setActiveSongData, setSongDataRefetch,recievedBPM} } >
        <div className={classes.containerDiv}>
        
        <Grid container>

          <Grid item xs={12}>
             <PlayerToolbar />
          </Grid>

        </Grid>
        
            <Grid container>

        

              <Grid item xs={12} className={classes.mainPanel}>
                 {/* {getMainComponent()} */}
                
              </Grid>

            </Grid>
        

        </div>
      </PlayerContext.Provider>
    </div>
  );
}

export default PlayerContainer

const useStyles = makeStyles(theme => ({
  root:{
    margin: '0 0 0 0',
  },
  containerDiv:{
    backgroundColor: '#fff',
    padding: "0%",
    
  },
  mainPanel:{
    boxShadow: 'inset 0px 2px 4px 0px #a7a7a7',
  }
}));