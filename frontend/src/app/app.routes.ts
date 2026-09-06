import { Routes } from '@angular/router';
import { SuperAdminDashboard } from './super-admin/super-admin-dashboard/super-admin-dashboard';
import { OrganizationCreateCourtComponent } from './super-admin/organization-create-Court/organization-create-Court';
import { OrganizationList } from './super-admin/organization-list/organization-list';
import { CreateUserAdmin } from './super-admin/create-user-admin/create-user-admin';



export const routes: Routes = [


{
    // path: 'super_admin',
    path: '',
    component: SuperAdminDashboard
},
{
    path: 'super-admin/create-organization',
    component: OrganizationCreateCourtComponent
},

{
    path: 'super-admin/courts-List',
    component: OrganizationList,
    // children
},

{
    path: 'super-admin/create-user-admin',
    component: CreateUserAdmin
}
];
