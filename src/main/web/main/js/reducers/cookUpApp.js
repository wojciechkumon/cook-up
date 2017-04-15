import {combineReducers} from 'redux';
import ingredients from '../../../finder/js/reducers/ingredients';
import recipes from '../../../recipe/js/reducers/recipes';

const calculatorApp = combineReducers({
  ingredients,
  recipes
});

export default calculatorApp;