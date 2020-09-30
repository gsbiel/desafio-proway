import 'fontsource-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers, compose, applyMiddleware, createStore} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as serviceWorker from './serviceWorker';
import {ThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter
} from "react-router-dom";

import './index.css';
import App from './App';
import {theme} from './my-theme';
import authReducer from './store/reducers/auth'
import signupReducer from './store/reducers/signup';

const rootReducer = combineReducers({
  auth: authReducer,
  signup: signupReducer
});

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
          <Provider store={store}>
            <App />
          </Provider>
        </ThemeProvider>    
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
