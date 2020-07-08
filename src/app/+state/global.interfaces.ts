/**
 * this file contains the global state for the application
 */
import {User} from "../users/user";
import {Organization} from "../organizations/organization";

export interface Global {
  // define state here
  user?: User;
  
}

export interface GlobalState {
  readonly app: Global;
}
