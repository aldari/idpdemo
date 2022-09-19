import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-dump',
  templateUrl: './dump.component.html',
  styleUrls: ['./dump.component.css']
})
export class DumpComponent implements OnInit {
  constructor(private oidcSecurityService: OidcSecurityService) { }

  ngOnInit(): void {
  }

  login() {
    console.log('start login');
    this.oidcSecurityService.authorize();
  }

  logout(){
    this.oidcSecurityService.logoffAndRevokeTokens().subscribe((result) => console.log(result));
  }
}
