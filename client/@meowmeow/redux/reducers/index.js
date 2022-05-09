import { combineReducers } from "redux";

import Language from "./lang";
import User from "./user"

export default combineReducers({
  LangCode: Language,
  User: User
});
