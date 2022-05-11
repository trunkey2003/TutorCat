import { combineReducers } from "redux";

import Language from "./lang";
import User from "./user"

import { Config } from "./config";

export default combineReducers({
  // LangCode: Language,
  // User: User
  Config: Config,
});
