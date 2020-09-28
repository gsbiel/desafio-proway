// my-theme.ts
import { DefaultTheme } from 'styled-components'
import {createMuiTheme} from '@material-ui/core/styles';
import {colorTheme} from './constants'

const myTheme: DefaultTheme = {
  borderRadius: '5px',

  colors: {
    main: 'cyan',
    secondary: 'magenta',
  },
}

const theme = createMuiTheme({

  palette: {

    primary: {
      light: colorTheme.primaryLight,
      main: colorTheme.primaryDark,
      dark: colorTheme.primaryDark
    },

    secondary:{
      light: colorTheme.secondaryLight,
      main: colorTheme.secondary,
      dark: colorTheme.secondaryDark
    }
    
  },

});

export { myTheme, theme }