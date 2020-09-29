import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { lighten, makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }));

const EnhancedTableToolbar = (props) => {

    const {
      handleOpenFormDialogue,
      handleCloseFormDialogue,
      tablePath
    } = props

    const classes = useToolbarStyles()
    const { numSelected } = props;

    const onEditHandler = () => {
      handleOpenFormDialogue("edit")
    }

    const onDeleteHandler = () => {
      console.log("Delete!")
    }

    const onAddHandler = () => {
      handleOpenFormDialogue("add")
    }

    let tooltips = <Tooltip title="Add" aria-label="add" onClick={() => onAddHandler()}>
                    <Fab color="secondary" className={classes.fab}>
                      <AddIcon style={{ fontSize: 30}} />
                    </Fab>
                  </Tooltip>;

    if(numSelected > 1){
      tooltips =  <Tooltip key="AB" onClick={() => onDeleteHandler()} title="Delete">
                    <IconButton aria-label="delete">
                      <DeleteIcon />
               
                    </IconButton>
                  </Tooltip>;
    }
    if(numSelected == 1){
      tooltips = [
                  <Tooltip key="AB" onClick={() => onDeleteHandler()} title="Delete">
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>,

                  <Tooltip key="BA" onClick={() => onEditHandler()} title="Edit" aria-label="add">
                    <Fab color="secondary" className={classes.fab}>
                      <EditIcon />
                    </Fab>
                  </Tooltip>
                ]
    }
  
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
              {tablePath}
          </Typography>
        )}
  
        {tooltips}

      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  export default EnhancedTableToolbar;