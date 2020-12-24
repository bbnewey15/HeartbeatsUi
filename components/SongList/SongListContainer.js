import React, {useRef, useState, useEffect, createContext} from 'react';
import {makeStyles, CircularProgress, Grid} from '@material-ui/core';


import cogoToast from 'cogo-toast';

import Util from '../../js/Util';
import Songs from  '../../js/Songs';

import SongListToolbar from './Toolbar/SongListToolbar';
//Sidebars
import SongSidebarList from './Sidebars/SongSidebarList';
//import SongSidebarDetail from './Sidebars/SongSidebarDetail';

//Main Panels
import SongList from './MainPanels/SongList';

//Extras



var today =  new Date();

export const ListContext = createContext(null);
export const DetailContext = createContext(null);

//This is the highest component for the Task Page
//Contains all important props that all tabs use
const SongListContainer = function(props) {
  const {user} = props;

  const [songs, setSongs] = useState(null);
  const [songsRefetch, setSongsRefetch] = useState(false);


  //views used through whole app, 
  //child views with parent run parent's onClose() function
  const views = [ { value: "allSongs", displayName: "List View", /*onClose: ()=> {setSongs(null)}*/ },
                  ];

  const [currentView,setCurrentView] = useState(null);


  
  const classes = useStyles();

  //Get View from local storage if possible || set default
  useEffect(() => {
    if(currentView == null){
      var tmp = window.localStorage.getItem('songListView');
      var tmpParsed;
      if(tmp){
        tmpParsed = JSON.parse(tmp);
      }
      if(tmpParsed){
        var view = views.filter((v)=> v.value == tmpParsed)[0]
        setCurrentView(view || views[0]);
      }else{
        setCurrentView(views[0]);
      }
    }
    if(currentView){
      window.localStorage.setItem('songListView', JSON.stringify(currentView.value));
    }
    
  }, [currentView]);

  
  // //OrderRows
  useEffect( () =>{
    //Gets data only on initial component mount or when rows is set to null
    if(songs == null || songsRefetch) {
      if(songsRefetch){
        setSongsRefetch(false);
      }

      Songs.getAllSongs()
      .then( data => { 
        setSongs(data);
      })
      .catch( error => {
        console.warn(error);
        cogoToast.error(`Error getting tasks`, {hideAfter: 4});
      })
    }

  },[songs, songsRefetch]);


    

  const getMainComponent = () =>{
    switch(currentView.value){
      case "allSongs":
        return <SongList />
        break;
      default: 
        cogoToast.error("Bad view");
        return <SongList />;
        break;
    }
  }

  const getSidebarComponent = () =>{
    switch(currentView.value){
      case "allSongs":
        return <SongSidebarList />
        break
      default: 
        cogoToast.error("Bad view");
        return <SongSidebarList />;
        break;
    }
  }
  

  return (
    <div className={classes.root}>
      <ListContext.Provider value={{songs, setSongs, setSongsRefetch, currentView, setCurrentView, views} } >
        <div className={classes.containerDiv}>
        
        <Grid container>

          <Grid item xs={12}>
            {currentView && <SongListToolbar />}
          </Grid>

        </Grid>
        
            <Grid container>

              <Grid item xs={2}>
                
                {currentView && getSidebarComponent()}
              </Grid>

              <Grid item xs={10} className={classes.mainPanel}>
                {currentView && getMainComponent()}
                
              </Grid>

            </Grid>
        

        </div>
      </ListContext.Provider>
    </div>
  );
}

export default SongListContainer

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