import {combineReducers} from "redux";
import frontend from "./frontend";
import auth from "../../../security/js/reducers/auth";
import form from "redux-form/es/reducer";
import ingredients from "../../../finder/js/reducers/ingredients";
import recipes from "../../../recipe/js/reducers/recipes";

const cookUpApp = combineReducers({
  frontend,
  auth,
  ingredients,
  recipes,
  form
});

export default cookUpApp;