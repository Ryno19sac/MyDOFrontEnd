export class UserPermission {
    slug?: string;
    name?: string;
    status?: boolean;
}

export class PermissionGroup {
    category?: string;
    viewPermission?: UserPermission;
    createPermission?: UserPermission;
    editPermission?: UserPermission;
    deletePermission?: UserPermission;
}

export class UserPermissions {
    permissionGroups?: PermissionGroup[];
}

export enum PERMISSION_ARRAY_NAMES {
    LOCATIONS = 0,
    USERS = 1
}

export let PERMISSIONS_LIST: PermissionGroup[] = [
    {
        category: 'LOCATION',
        viewPermission: {slug: 'hasLocationView', name: 'hasLocationView', status: false},
        createPermission: {slug: 'hasLocationCreate', name: 'hasLocationCreate', status: false},
        editPermission: {slug: 'hasLocationEdit', name: 'hasLocationEdit', status: false},
        deletePermission: {slug: 'hasLocationDelete', name: 'hasLocationDelete', status: false}
    },
    {
        category: 'USERS',
        viewPermission: {slug: 'hasUserView', name: 'hasUserView', status: false},
        createPermission: {slug: 'hasUserCreate', name: 'hasUserCreate', status: false},
        editPermission: {slug: 'hasUserEdit', name: 'hasUserEdit', status: false},
        deletePermission: {slug: 'hasUserDelete', name: 'hasUserDelete', status: false}
    }
    // {
    //     category: 'USER-ROLES',
    //     viewPermission: {slug: 'hasUserRoleView', name: 'hasUserRoleView', status: false},
    //     createPermission: {slug: 'hasUserRoleCreate', name: 'hasUserRoleCreate', status: false},
    //     editPermission: {slug: 'hasUserRoleEdit', name: 'hasUserRoleEdit', status: false},
    //     deletePermission: {slug: 'hasUserRoleDelete', name: 'hasUserRoleDelete', status: false}
    // }
];
