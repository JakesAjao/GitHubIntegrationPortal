import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
//import { DispatchcardComponent } from 'app/pages/dispatchcard/dispatchcard.component';
import { AuthGuard } from 'app/auth/auth.guard';
import { AnalyticsComponent } from 'app/pages/analytics/analytics.component';
import { CommitterComponent } from 'app/pages/committer/committer.component';
import { CommitComponent } from 'app/pages/commit/commit.component';
import { BarchartComponent } from 'app/pages/barchart/barchart.component';

export const AdminLayoutRoutes: Routes = [
  
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent }, 
    { path: 'analytics',      component: AnalyticsComponent }, 
   
    

  { path: 'analytics', component: AnalyticsComponent, 
  children: [
  { path: 'committers/:name', component: CommitterComponent, canActivate: [AuthGuard] },
  //{ path: 'commit', component: CommitComponent, canActivate: [AuthGuard] },
  { path: 'insights', component: BarchartComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'committer', pathMatch: 'full'}
]},   
     
];
