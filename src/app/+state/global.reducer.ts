import * as GlobalActions from './global.actions';
import {OrganizationUpdatedAction, UserUpdatedAction} from './global.actions';
import {Global} from "./global.interfaces";
import {AuthService} from '../auth/auth.service';

export type Action = GlobalActions.All;

export function globalReducer(state: Global, action: Action): void
// Global 
{
  // switch (action.type) {
  //   case GlobalActions.DATA_LOAD: {
  //     return { ...state };
  //   }
  //   case GlobalActions.ORGANIZATION_UPDATED: {
  //     const payloadOrganization = (action as OrganizationUpdatedAction).payload;
  //     // should update localStorage as well so this doesn't get clobbered
  //     localStorage.setItem(AuthService.AUTH_ORGANIZATION_OBJECT, JSON.stringify(payloadOrganization));
  //     // update the current state with the new account
  //     return { ...state, organization: payloadOrganization };
  //   }
  //   case GlobalActions.USER_UPDATED: {
  //     // update the current state with the new account
  //     return { ...state, user: (action as UserUpdatedAction).payload };
  //   }
  //   case GlobalActions.ADMINPAGE_OFF: {
  //     return { ...state, adminPage: false };
  //   }
  //   case GlobalActions.ADMINPAGE_ON: {
  //     return { ...state, adminPage: true };
  //   }
  //   default: {
  //     return state;
  //   }
  }

