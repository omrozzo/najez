import { Routes } from '@angular/router';
import { SuperAdminDashboard } from './super-admin/super-admin-dashboard/super-admin-dashboard';
import { OrganizationCreateCourtComponent } from './super-admin/organization-create-Court/organization-create-Court';
import { CourtReview } from './super-admin/organization-lista/Court-Review/Court-Review';
import { CreateUserAdmin } from './super-admin/create-user-admin/create-user-admin';
import { CourtData } from './super-admin/organization-lista/court-data/court-data';



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
    component: CourtReview,
  
},

{
    path: 'super-admin/court-data/:id',
    component: CourtData
},

{
    path: 'super-admin/create-user-admin',
    component: CreateUserAdmin
}

];
