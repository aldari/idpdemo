import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DumpComponent } from './modules/test/dump/dump.component';

import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

import { CoreModule } from './modules/core/core.module';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { ForecastService } from './modules/core/history/forecast.service';
import { HistoryComponent } from './modules/core/history/history.component';
import { AuthInterceptor } from './AuthInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    DumpComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    CoreModule,
    FlexLayoutModule,
    MatButtonModule,
    AuthModule.forRoot({
      config: {
          authority: 'http://localhost:44395',
          redirectUrl: window.location.origin,
          postLogoutRedirectUri: window.location.origin,
          clientId: 'angularclient',
          scope: 'openid profile email offline_access',
          responseType: 'code',
          silentRenew: true,
          renewTimeBeforeTokenExpiresInSeconds: 10,
          useRefreshToken: true,
          logLevel: LogLevel.Debug,
          ignoreNonceAfterRefresh: true
      },
    }),
  ],
  providers: [ 
    ForecastService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
