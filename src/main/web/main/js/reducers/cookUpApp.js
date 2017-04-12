import {combineReducers} from 'redux';
import ingredients from '../../../finder/js/reducers/ingredients';

const calculatorApp = combineReducers({
  ingredients
});

export default calculatorApp;