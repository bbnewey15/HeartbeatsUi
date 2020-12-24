const express = require('express');
const router = express.Router();
var async = require("async");

const logger = require('../../logs');

const Util = require('../../js/Util');
//Handle Database
const database = require('./db');

router.post('/getAllSongs', async (req,res) => {


    const sql = ' SELECT * FROM songs';
    try{
        const results = await database.query(sql, []);
        logger.info("Got All Songs");


        res.json(results);
    }
    catch(error){
        logger.error("Songs: " + error);
        res.sendStatus(400);
    }
});




module.exports = router;