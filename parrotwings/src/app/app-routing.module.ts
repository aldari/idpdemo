import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './modules/core/admin-layout/admin-layout.component';
import { HistoryComponent } from './modules/core/history/history.component';
import { PageNotFoundComponent } from './modules/core/page-not-found/page-not-found.component';

import { DumpComponent } from './modules/test/dump/dump.component';

const appRoutes: Routes = [
  {
      path: '',
      component: AdminLayoutComponent,
      children: [
          { path: '', component: DumpComponent },
          { path: 'history', component: HistoryComponent },
          { path: 'last-transaction', component: DumpComponent },
      ],
      // resolve: { balanceData: BalanceResolverService }
  },
  {
      path: '**',
      component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
