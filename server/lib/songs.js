const express = require('express');
const router = express.Router();
var async = require("async");

const logger = require('../../logs');

const Util = require('../../js/Util');
//Handle Database
const database = require('./db');

// router.post('/getAllWorkOrders', async (req,res) => {
//     var dateRange = {};
//     if(req.body){
//         dateRange = req.body.dateRange;
//     }

//     const sql = 'SELECT DISTINCT wo.record_id AS wo_record_id, date_format(wo.date, \'%Y-%m-%d\') as date, wo.type AS wo_type, wo.completed AS completed, wo.invoiced AS invoiced, ' +
//     ' organization AS account, wo.city AS wo_city, wo.state AS wo_state, description, customer, account_id, ' +
//     ' wo.customer_id AS wo_customer_id, a.name AS a_name, c.name AS c_name, sa.city AS sa_city, sa.state AS sa_state ' +
//     ' FROM work_orders wo ' +
//     ' LEFT JOIN entities a ON wo.account_id = a.record_id ' +
//     ' LEFT JOIN entities_addresses sa ON a.record_id = sa.entities_id AND sa.main = 1 ' +
//     ' LEFT JOIN entities c ON wo.customer_id = c.record_id ' +
//     ' WHERE date >= ? AND date <= ? ' + 
//     ' ORDER BY wo.record_id DESC ' +
//     ' limit 2000 ';
//     try{
//         const results = await database.query(sql, [dateRange["from"], dateRange["to"]]);
//         logger.info("Got Work Orders");

//         results.forEach((row, i)=> {
//             if(row['completed'] === 0){
//                 row['completed'] = 'Not Completed';
//             } else if(row['completed'] === 1){
//                 row['completed'] = 'Completed';
//             }
//             if(row['invoiced'] === 0){
//                 row['invoiced'] = 'Not Invoiced';
//             } else if(row['invoiced'] === 1){
//                 row['invoiced'] = 'Invoiced';
//             }
//         })

//         res.json(results);
//     }
//     catch(error){
//         logger.error("Work Orders: " + error);
//         res.sendStatus(400);
//     }
// });




module.exports = router;