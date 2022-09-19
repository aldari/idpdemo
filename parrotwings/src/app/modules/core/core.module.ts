import { NgModule } from '@angular/core';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

registerLocaleData(localeRu);

@NgModule({
    declarations: [ AdminLayoutComponent, PageNotFoundComponent ],
    imports: [ 
      AppRoutingModule,
      MatSidenavModule,
      MatIconModule,
      MatToolbarModule,
      MatListModule,
    ],
    exports: [ AppRoutingModule, AdminLayoutComponent, PageNotFoundComponent ],
    providers: []
})
export class CoreModule {}
