
import { makeStyles } from '@material-ui/core/styles';
import {SeasonType} from '../../../../store/reducers/painel';


// const rowsForSeasons = [
//   createSeasonData('Cupcake', 305, 3.7, 67, 4.3,'02/03/2020','03/03/2020'),
//   createSeasonData('Donut', 452, 25.0, 51, 4.9,'04/03/2020','07/02/2020'),
//   createSeasonData('Eclair', 262, 16.0, 24, 6.0,'06/03/2020','07/02/2020'),
//   createSeasonData('Frozen yoghurt', 159, 6.0, 24, 4.0,'08/03/2020','09/02/2020'),
//   createSeasonData('Gingerbread', 356, 16.0, 49, 3.9,'10/03/2020','11/03/2020'),
//   createSeasonData('Honeycomb', 408, 3.2, 87, 6.5,'02/03/2020',''),
//   createSeasonData('Ice cream sandwich', 237, 9.0, 37, 4.3,'02/03/2020',''),
//   createSeasonData('Jelly Bean', 375, 0.0, 94, 0.0,'02/03/2020',''),
//   createSeasonData('KitKat', 518, 26.0, 65, 7.0,'02/03/2020',''),
//   createSeasonData('Lollipop', 392, 0.2, 98, 0.0,'02/03/2020',''),
//   createSeasonData('Marshmallow', 318, 0, 81, 2.0,'02/03/2020',''),
//   createSeasonData('Nougat', 360, 19.0, 9, 37.0,'02/03/2020',''),
//   createSeasonData('Oreo', 437, 18.0, 63, 4.0,'02/03/2020',''),
// ];

export const createSeasonData = (name, highest, lowest, highestBreaks, lowestBreaks, start, end) => {
    return { name, highest, lowest, highestBreaks, lowestBreaks, start, end };
}

export function createGameData(name, highest, date) {
    return { name, highest, date };
}

export function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
export function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));