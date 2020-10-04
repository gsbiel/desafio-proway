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
  getComparator,
  stableSort,
  useStyles
} from './util';

import {
  CustomPaper
} from './styles';

import { 
  painelRefreshTableData, 
  painelFetchSeasons, 
  painelFetchGames,
  painelSelectSeason,
  painelUnselectSeason,
  painelSelectGame
} from '../../../../store/actions/painel';

import { DialogueFormModeType } from '../../../../store/reducers/painel';

const customRowsPerPage = 8;
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

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
  { id: 'GameName', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'GameScore', numeric: true, disablePadding: false, label: 'Score' },
  { id: 'GameDate', numeric: false, disablePadding: false, label: 'Date' }
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

  const userSeasons = useSelector( (state) => state.painel.seasons);
  const selectedSeasonId = useSelector( (state) => state.painel.selectedSeasonId);
  const userGames = useSelector ((state) => state.painel.games);

  const userId = useSelector( (state) => state.auth.userId);
  const userToken = useSelector( (state) => state.auth.token);

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(customRowsPerPage);

  const [headCells, setHeadCells] = React.useState(headCellsForSeasons);
  const [rows, setRows] = React.useState([])
  const [tablePath, setTablePath] = React.useState("Seasons")

  let checkBoxClicked = false

  useEffect(()=> {
    if(formDialogueMode == DialogueFormModeType.SEASON){
      if(!userSeasons.length){
        dispatch(painelFetchSeasons(userToken,userId));
      }
    }
  },[])

  useEffect(() => {
    if(formDialogueMode == DialogueFormModeType.GAME && selectedSeasonId.length){
      console.log(`Diapachando com seasonID: ${selectedSeasonId}`);
      dispatch(painelFetchGames(userToken,userId, selectedSeasonId));
    }
  }, [selectedSeasonId])

  useEffect(()=>{
    const rowsForSeasons = adaptSeasonForTable(userSeasons);
    setRows(rowsForSeasons);
  }, [userSeasons])

  useEffect(()=>{
    if(userGames.length){
      console.log(userGames)
      const rowsForGames = userGames.map(gameItem => {
        const gameDateArray = gameItem.date.toISOString().split('T')[0].split("-");
        const gameDate = `${gameDateArray[2]}/${gameDateArray[1]}/${gameDateArray[0]}`;
        return{
          name: gameItem.name,
          score: gameItem.score,
          date: gameDate,
          id: gameItem.id
        };
      });
      setRows(rowsForGames);
    } 
  }, [userGames]) ;

  useEffect(()=>{
    if(formDialogueMode == DialogueFormModeType.SEASON && userSeasons.length > 0){
      const rowsForSeasons = adaptSeasonForTable(userSeasons);
      setTablePath(`Seasons`)
      setHeadCells(headCellsForSeasons)
      setRows(rowsForSeasons);
    }
  },[formDialogueMode])

  const adaptSeasonForTable = (userSeasons) => {
    const rowsForSeasons = userSeasons.map(seasonItem => {
      const startArray = seasonItem.start.toISOString().split('T')[0].split("-");
      const startDate = `${startArray[2]}/${startArray[1]}/${startArray[0]}`;
      const endArray = seasonItem.end ? seasonItem.end.toISOString().split('T')[0].split("-") : null;
      const endDate = endArray ? `${endArray[2]}/${endArray[1]}/${endArray[0]}` : "";
      return{
        name: seasonItem.name,
        highest: seasonItem.max_score,
        lowest: seasonItem.min_score,
        highestBreaks: seasonItem.max_score_count,
        lowestBreaks: seasonItem.min_score_count,
        start: startDate,
        end: endDate,
        id: seasonItem.id
      }
    });
    return rowsForSeasons;
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = async (event, name, id) => {
    console.log(`Clicou na celula de id: ${id}`);
    await set_delay(50)
    if(!checkBoxClicked){
      setSelected([])
      if(formDialogueMode == DialogueFormModeType.SEASON){
        setTablePath(`Games for <${name}>`)
        setHeadCells(headCellsForGames)
        setRows([])
        dispatch(painelRefreshTableData(DialogueFormModeType.GAME));
        dispatch(painelSelectSeason(id));
      }
    }
    checkBoxClicked = false
  };

  const handleCheckboxClick = (event, name, id) => {

    if(formDialogueMode == DialogueFormModeType.SEASON){
      dispatch(painelSelectSeason(id));
    }
    if(formDialogueMode == DialogueFormModeType.GAME){
      dispatch(painelSelectGame(id));
    }
    
    checkBoxClicked = true
    let selectedIndex = selected.indexOf(id);
    let newSelected = [];
    let stateCopy = [...selected];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(stateCopy, id);
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

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
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={characters.shuffle()}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onChange={(event)=>handleCheckboxClick(event, row.name, row.id)}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      {
                        Object.keys(row).map(key => {
                          // console.log(`key: ${key}`)
                          if(key==0){
                            return  <TableCell key={characters.shuffle()} component="th" id={labelId} scope="row" padding="none">
                                      {row[key]}
                                    </TableCell>
                          }else if(key!== "id"){
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
