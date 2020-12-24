import React, {useRef, useState, useEffect, useContext} from 'react';
import {makeStyles, withStyles, CircularProgress, Grid, IconButton} from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';



import cogoToast from 'cogo-toast';


import Util from  '../../../js/Util';
import { ListContext } from '../PlayerContainer';


const OrdersList = function(props) {
  const {user} = props;

  const { songs, setSongs, setSongsRefetch, currentView, setCurrentView, views} = useContext(ListContext);
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(null);



  

  // const handleShowDetailView = (wo_id) =>{
  //   if(!wo_id){
  //     cogoToast.error("Failed to get work order");
  //     console.error("Bad id");
  //     return;
  //   }
  //   setCurrentView(views && views.filter((view, i)=> view.value == "woDetail")[0]);
  //   setDetailWOid(wo_id);

  // }
  
  const columns = [
    { id: 'id', label: 'Id', minWidth: 20, align: 'center' },
    {
      id: 'name',
      label: 'Name',
      minWidth: 250,
      align: 'left',
    },
    { id: 'description', label: 'Description', minWidth: 400, align: 'left' },
    { id: 'initial_bpm', label: 'BPM', minWidth: 90, align: 'center' },
    { id: 'date_created', label: 'Date Created', minWidth: 90, align: 'center' },
  ];

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: "#e8e8e8",
        '&:hover':{
          backgroundColor: "#dcdcdc",
        }
      },
      '&:nth-of-type(even)': {
        backgroundColor: '#f7f7f7',
        '&:hover':{
          backgroundColor: "#dcdcdc",
        }
      },
      border: '1px solid #111 !important',
      '&:first-child':{
        border: '2px solid #992222',
      }
    },
  }))(TableRow);

  return (
    <div className={classes.root}>
        <TableContainer className={classes.container}>
        <Table stickyHeader  size="small" aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                className={classes.tableCellHead}
                classes={{stickyHeader: classes.stickyHeader}}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {songs && songs.map((row) => {
              return (
                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell className={classes.tableCell} 
                                key={column.id}
                                 align={column.align}
                                 style={{ minWidth: column.minWidth }}>
                        {column.format ? column.format(value, row) : value}
                      </TableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    
    </div>
  );
}

export default OrdersList



const useStyles = makeStyles(theme => ({
  root:{
    // border: '1px solid #339933',
    padding: '1%',
    minHeight: '730px',
  },
  container: {
    maxHeight: 650,
  },
  stickyHeader:{
    // background: 'linear-gradient(0deg, #a4dbe6, #cbf1f9)',
    fontWeight: '600',
    fontFamily: 'sans-serif',
    fontSize: '15px',
    color: '#1b1b1b',
    backgroundColor: '#fff',
    zIndex: '1',
    
  },
  tableCell:{
    borderRight: '1px solid #c7c7c7' ,
    '&:last-child' :{
      borderRight: 'none' ,
    },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: '150px',
    textOverflow: 'ellipsis',
    padding: "4px 6px",
  },
  tableCellHead:{
    
  },
  clickableWOnumber:{
    cursor: 'pointer',
    textDecoration: 'underline',
    '&:hover':{
      color: '#ee3344',
    }
  },
}));