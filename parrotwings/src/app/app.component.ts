import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'parrotwings';

  userData$: Observable<any> = of({});
  isAuthenticated = false;
  
  constructor(private oidcSecurityService: OidcSecurityService) { }

  ngOnInit(): void {
    this.userData$ = this.oidcSecurityService.userData$;

    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;
      console.log('app authenticated', isAuthenticated);
    });
  }
}
