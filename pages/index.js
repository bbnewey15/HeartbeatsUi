import React, { useEffect , useState} from 'react'
import PropTypes from 'prop-types';

import MainLayout from '../components/Layouts/Main';
import withAuth from '../server/lib/withAuth';
import ReconnectSnack from '../components/UI/ReconnectSnack';

import SongListContainer from '../components/SongList/SongListContainer';

import socketIOClient from 'socket.io-client';
import getConfig from 'next/config';
const {publicRuntimeConfig} = getConfig();
const {ENDPOINT_PORT, ENDPOINT_HOST} = publicRuntimeConfig;
const endpoint =  ENDPOINT_HOST+ ":" + ENDPOINT_PORT;

const Index = function (props) {
    
    const [recievedBPM, setRecievedBPM] = useState(null);
    const [socket, setSocket] = useState(null);
    const {user} = props;

    useEffect(()=>{
      //Set out Socket IO to endpoint once or if null
      if(socket == null){
        setSocket(socketIOClient(endpoint));
      }
      //If socket, register event for our data. 
      //This will continue to update data even though the socket useEffect will only run this once
      if(socket != null){
        socket.on("FromC", async data => {
          try{
            var json = await JSON.parse(data);
            setRecievedBPM(json.bpm);
          }
          catch(error){
            console.log(error);
          }
        }); 
      }
    },[socket])


    return (
        <MainLayout>
              <ReconnectSnack recievedBPM={recievedBPM} socket={socket} />
              <SongListContainer user={user} recievedBPM={recievedBPM}/>
        </MainLayout>
    );
}

//does work when were being passed props 
// WorkOrders.getInitialProps = async ({ query }) => ({ settings: query.settings });

// WorkOrders.propTypes = {
//   settings: PropTypes.shape({
//     results: PropTypes.array.isRequired,
//   }),
// };

Index.defaultProps = {
  settings: null,
};

export default withAuth(Index);