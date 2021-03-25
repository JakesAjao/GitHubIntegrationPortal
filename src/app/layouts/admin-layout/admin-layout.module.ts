import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { TableComponent }           from '../../pages/table/table.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
import { MapsComponent }            from '../../pages/maps/maps.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
import { UpgradeComponent }         from '../../pages/upgrade/upgrade.component';
import { DispatchcardComponent }    from '../../pages/dispatchcard/dispatchcard.component';
import { AcknowledgeComponent }    from '../../pages/Acknowledge/Acknowledge.component';
import { ActivateComponent }    from '../../pages/Activate/Activate.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogModule } from 'app/confirm-dialog/confirm-dialog.module';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';

import { BnNgIdleService } from 'bn-ng-idle'; // import bn-ng-idle service
import { NgxSpinnerModule } from 'ngx-spinner';
import { ExcelService } from 'app/services/excel.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PickupComponent } from 'app/pages/pickup/pickup.component';
import { CarduploadComponent } from 'app/pages/cardupload/cardupload.component';
import { GridModule } from '@angular/flex-layout';
@NgModule({
  imports: [
    
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    MatFormFieldModule,    
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,    
    FormsModule,
    ReactiveFormsModule,
    ToastNotificationsModule,
    //BrowserAnimationsModule,
    BackButtonDisableModule.forRoot({
      preserveScrollPosition: true
    }),
    NgxSpinnerModule,
    GridModule
    ],
    providers: [ExcelService], // add it to the providers of your module
    
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    DispatchcardComponent,
    AcknowledgeComponent,
    ActivateComponent,
    PickupComponent,
    CarduploadComponent
  ],
  
  exports: [    
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    MatCheckboxModule,
    
    //ConfirmDialogModule,
  ], 
})

export class AdminLayoutModule {}
