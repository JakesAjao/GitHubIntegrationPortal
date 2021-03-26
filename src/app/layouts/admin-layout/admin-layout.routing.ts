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
import { AuthGuard } from 'app/auth/auth.guard';
import { CarduploadComponent } from 'app/pages/cardupload/cardupload.component';
import { BlankcardComponent } from 'app/pages/blankcard/blankcard.component';
import { BlankcardAcknowledgementComponent } from 'app/pages/blankcard-acknowledgement/blankcard-acknowledgement.component';
import { BlankcardUploadComponent } from 'app/pages/blankcard-upload/blankcard-upload.component';

export const AdminLayoutRoutes: Routes = [
  
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },    
    
    { path: 'creditcard', component: DispatchcardComponent, 
    children: [
      { path: 'cardupload', component: CarduploadComponent, canActivate: [AuthGuard] },
    { path: 'acknowledge', component: AcknowledgeComponent, canActivate: [AuthGuard] },
    { path: 'pickup', component: PickupComponent, canActivate: [AuthGuard] },
    { path: 'activate', component: ActivateComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'cardupload', pathMatch: 'full'}
  ]},
  { path: 'blankcard', component: BlankcardComponent, 
    children: [
     { path: 'acknowledge', component: BlankcardAcknowledgementComponent, canActivate: [AuthGuard] },
     { path: 'cardupload', component: BlankcardUploadComponent, canActivate: [AuthGuard] },
     { path: '', redirectTo: 'cardupload', pathMatch: 'full'}
  ]},    
     
];
