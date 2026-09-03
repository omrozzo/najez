import { Routes } from '@angular/router';
import { SuperAdminDashboard } from './super-admin/super-admin-dashboard/super-admin-dashboard';
import { OrganizationCreateComponent } from './super-admin/organization-create/organization-create';
import { OrganizationList } from './super-admin/organization-list/organization-list';



export const routes: Routes = [


{
    path: 'super_admin',
    component: SuperAdminDashboard
},
{
    path: 'super-admin/create-organization',
    component: OrganizationCreateComponent
},

{
    path: 'super-admin/courts',
    component: OrganizationList
}

];
