import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import home from './home';


const rootReducer = combineReducers({
  home,
  routing
});

export default rootReducer;
