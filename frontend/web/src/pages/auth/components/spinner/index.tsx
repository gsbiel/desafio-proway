import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import {
  MyBackdrop
} from './styles';

import {
  colorTheme
} from '../../../../constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: colorTheme.primaryDark,
    },
  }),
);

export default function SimpleBackdrop() {

  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    // setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <MyBackdrop className={classes.backdrop} open={open} onClick={handleClose}>
      <CircularProgress color="inherit" />
    </MyBackdrop>
  );
}