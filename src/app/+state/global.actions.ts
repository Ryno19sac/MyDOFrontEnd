import {Action} from '@ngrx/store';
import {User} from '../users/user';
import {Organization} from "../organizations/organization";

export const DATA_LOAD = '[Data] Load';
export const DATA_LOADED = '[Data] Loaded';
export const ACCOUNT_UPDATED = '[Account] Updated';
export const ORGANIZATION_UPDATED = '[Organization] Updated';
export const USER_UPDATED = '[User] Updated';
export const ADMINPAGE_ON = '[AdminPage] Off';
export const ADMINPAGE_OFF = '[AdminPage] On';
export const CLIENT_KEY_UPDATED = '[ClientKey] Updated';
export const DASHBOARD_CONFIGURATION_UPDATED = '[DashboardConfiguration] Updated';

export class LoadData implements Action {
  readonly type = DATA_LOAD;
}

export class DataLoaded implements Action {
  readonly type = DATA_LOADED;
}

export class AccountUpdatedAction implements Action {
  readonly type = ACCOUNT_UPDATED;
  constructor(public payload: Account) {}
}

export class OrganizationUpdatedAction implements Action {
  readonly type = ORGANIZATION_UPDATED;
  constructor(public payload: Organization) {}
}

export class UserUpdatedAction implements Action {
  readonly type = USER_UPDATED;
  constructor(public payload: User) {}
}

export class AdminPageOnAction implements Action {
  readonly type = ADMINPAGE_ON;
  constructor() {}
}

export class AdminPageOffAction implements Action {
  readonly type = ADMINPAGE_OFF;
  constructor() {}
}

export class ClientKeyUpdatedAction implements Action {
  readonly type = CLIENT_KEY_UPDATED;
  constructor(public payload: string) {}
}

export class DashboardConfigurationUpdatedAction implements Action{
  readonly type = DASHBOARD_CONFIGURATION_UPDATED;
  constructor(public payload: any){ }
}

export type All = LoadData | DataLoaded | AccountUpdatedAction
    | UserUpdatedAction | AdminPageOnAction | AdminPageOffAction
    | OrganizationUpdatedAction | ClientKeyUpdatedAction
    | DashboardConfigurationUpdatedAction;