import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';

@NgModule({
    imports: [ RouterModule, CommonModule, NgbModule,
        MatButtonModule,
        BackButtonDisableModule.forRoot({
            preserveScrollPosition: true
          }),
        ],
    declarations: [ NavbarComponent ],
    exports: [ NavbarComponent,
        MatButtonModule, ]
})

export class NavbarModule {}
