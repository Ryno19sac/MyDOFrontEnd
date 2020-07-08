export class UserRole {
  id?: number;
  name?: string;
  description?: string;
  systemRole?: boolean;
  hasOrganizationView?: boolean;
  hasOrganizationCreate?: boolean;
  hasOrganizationEdit?: boolean;
  hasOrganizationDelete?: boolean;
  // account permissions
  hasAccountView?: boolean;
  hasAccountCreate?: boolean;
  hasAccountEdit?: boolean;
  hasAccountDelete?: boolean;
  // user permissions
  hasUserView?: boolean;
  hasUserCreate?: boolean;
  hasUserEdit?: boolean;
  hasUserDelete?: boolean;
  // user_role permissions
  hasUserRoleView?: boolean;
  hasUserRoleCreate?: boolean;
  hasUserRoleEdit?: boolean;
  hasUserRoleDelete?: boolean;
  // location permissions
  hasLocationView?: boolean;
  hasLocationCreate?: boolean;
  hasLocationEdit?: boolean;
  hasLocationDelete?: boolean;
  // metadata
  active?: boolean;
  created?: string;
  modified?: string;
}
