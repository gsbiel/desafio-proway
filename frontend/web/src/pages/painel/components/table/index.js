import React,{useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToobar.'
import {
  createSeasonData,
  createGameData,
  getComparator,
  stableSort,
  useStyles
} from './util';

import {RootState} from '../../../../index';


import {
  CustomPaper
} from './styles';
import { painelRefreshTableData } from '../../../../store/actions/painel';
import { DialogueFormModeType } from '../../../../store/reducers/painel';

const customRowsPerPage = 8
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const rowsForSeasons = [
  createSeasonData('Cupcake', 305, 3.7, 67, 4.3,'02/03/2020','03/03/2020'),
  createSeasonData('Donut', 452, 25.0, 51, 4.9,'04/03/2020','07/02/2020'),
  createSeasonData('Eclair', 262, 16.0, 24, 6.0,'06/03/2020','07/02/2020'),
  createSeasonData('Frozen yoghurt', 159, 6.0, 24, 4.0,'08/03/2020','09/02/2020'),
  createSeasonData('Gingerbread', 356, 16.0, 49, 3.9,'10/03/2020','11/03/2020'),
  createSeasonData('Honeycomb', 408, 3.2, 87, 6.5,'02/03/2020',''),
  createSeasonData('Ice cream sandwich', 237, 9.0, 37, 4.3,'02/03/2020',''),
  createSeasonData('Jelly Bean', 375, 0.0, 94, 0.0,'02/03/2020',''),
  createSeasonData('KitKat', 518, 26.0, 65, 7.0,'02/03/2020',''),
  createSeasonData('Lollipop', 392, 0.2, 98, 0.0,'02/03/2020',''),
  createSeasonData('Marshmallow', 318, 0, 81, 2.0,'02/03/2020',''),
  createSeasonData('Nougat', 360, 19.0, 9, 37.0,'02/03/2020',''),
  createSeasonData('Oreo', 437, 18.0, 63, 4.0,'02/03/2020',''),
];

const rowsForGames= [
  createGameData('Jogo dos migos',150,'01/03/2020'),
  createGameData('Jogo da escola',50,'01/03/2020'),
  createGameData('ajsdajskdk',30,'01/03/2020')
]

const headCellsForSeasons = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'highest_score', numeric: true, disablePadding: false, label: 'Highest Score' },
  { id: 'lowest_score', numeric: true, disablePadding: false, label: 'Lowest Score' },
  { id: 'high_score_brks', numeric: true, disablePadding: false, label: 'Highest score breaks' },
  { id: 'low_score_brks', numeric: true, disablePadding: false, label: 'Lowest score breaks' },
  { id: 'start', numeric: false, disablePadding: false, label: 'Start'},
  { id: 'end', numeric: false, disablePadding: false, label: 'End' },
];

const headCellsForGames = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'score', numeric: true, disablePadding: false, label: 'Highest Score' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' }
];

String.prototype.shuffle = function () {
  var a = this.split(""),
      n = a.length;

  for(var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
  }
  return a.join("");
}

function EnhancedTable() {

  const dispatch = useDispatch()
  const formDialogueMode = useSelector( (state) => state.painel.dialogueEntityMode);

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(customRowsPerPage);

  const [headCells, setHeadCells] = React.useState(headCellsForSeasons);
  const [rows, setRows] = React.useState(rowsForSeasons)
  const [tablePath, setTablePath] = React.useState("Seasons")

  let checkBoxClicked = false

  useEffect(() => {
    if(formDialogueMode == DialogueFormModeType.SEASON){
      setTablePath(`Season`)
      setHeadCells(headCellsForSeasons)
      setRows(rowsForSeasons)
    }
  },[formDialogueMode])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = async (event, name) => {
    await set_delay(50)
    if(!checkBoxClicked){
      setSelected([])
      if(formDialogueMode == DialogueFormModeType.SEASON){
        setTablePath(`Games for <${name}>`)
        setHeadCells(headCellsForGames)
        setRows(rowsForGames)
        dispatch(painelRefreshTableData(DialogueFormModeType.GAME));
      }
    }
    checkBoxClicked = false
  };

  const handleCheckboxClick = (event, name) => {
    checkBoxClicked = true
    let selectedIndex = selected.indexOf(name);
    let newSelected = [];
    let stateCopy = [...selected];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(stateCopy, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(stateCopy.slice(1));
    } else if (selectedIndex === stateCopy.length - 1) {
      newSelected = newSelected.concat(stateCopy.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        stateCopy.slice(0, selectedIndex),
        stateCopy.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  }

  const set_delay = (ms) => {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
      <CustomPaper >
        <EnhancedTableToolbar 
          numSelected={selected.length} 
          tablePath={tablePath}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={characters.shuffle()}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onChange={ (event)=>handleCheckboxClick(event, row.name)}
                          checked={ isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      {
                        Object.keys(row).map(key => {
                          if(key==0){
                            return  <TableCell key={characters.shuffle()} component="th" id={labelId} scope="row" padding="none">
                                      {row[key]}
                                    </TableCell>
                          }else{
                            return <TableCell key={characters.shuffle()} align="right">{row[key]}</TableCell>
                          }
                        })
                      }
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[customRowsPerPage]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />  
      </CustomPaper>
  );
}

export default EnhancedTable;
