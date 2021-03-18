import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { DispatchcardComponent } from 'app/pages/dispatchcard/dispatchcard.component';
import { AcknowledgeComponent } from 'app/pages/Acknowledge/Acknowledge.component';
import { ActivateComponent } from 'app/pages/Activate/Activate.component';
import { PickupComponent } from 'app/pages/pickup/pickup.component';
import { ConfirmDialogComponent } from 'app/confirm-dialog/confirm-dialog.component';

export const AdminLayoutRoutes: Routes = [
  
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    
    { path: 'dispatchcard', component: DispatchcardComponent, 
    children: [
    { path: 'acknowledge', component: AcknowledgeComponent },
    { path: 'pickup', component: PickupComponent },
    { path: 'activate', component: ActivateComponent },
    //{ path: '', redirectTo: 'acknowledge', pathMatch: 'full'}
  ]},    
    
 //{ path: 'confirm-dialog', component: ConfirmDialogComponent }, 
];
