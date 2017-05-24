import {combineReducers} from "redux";
import frontend from "./frontend";
import auth from "../../../security/js/reducers/auth";
import form from "redux-form/es/reducer";
import ingredients from "../../../finder/js/reducers/ingredients";
import recipes from "../../../recipe/js/reducers/recipes";
import me from "../../../me/js/reducers/me";
import profiles from "../../../profile/js/reducers/profiles";

const cookUpApp = combineReducers({
  frontend,
  auth,
  ingredients,
  recipes,
  me,
  profiles,
  form
});

export default cookUpApp;