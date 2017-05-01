import {combineReducers} from "redux";
import frontend from "./frontend";
import user from "../../../security/js/reducers/user";
import {reducer as formReducer} from "redux-form";
import ingredients from "../../../finder/js/reducers/ingredients";
import recipes from "../../../recipe/js/reducers/recipes";

const cookUpApp = combineReducers({
  frontend,
  user,
  ingredients,
  recipes,
  form: formReducer
});

export default cookUpApp;