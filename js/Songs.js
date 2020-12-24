
import 'isomorphic-unfetch';

async function getAllSongs(){

    const route = '/songs/getAllSongs';
    try{
        var data = await fetch(route,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        var list = await data.json();
        return(list);
    }catch(error){
        throw error;
    }

}



module.exports = {
    getAllSongs,

};