import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Forecast } from './forecast.model';

@Injectable()
export class ForecastService {

    private actionUrl: string;
    private headers: HttpHeaders = new HttpHeaders();

    constructor(private http: HttpClient, private securityService: OidcSecurityService) {
        this.actionUrl = `http://api/weatherforecast/`;
    }

    public GetAll = (): Observable<Forecast[]> => {
        return this.http.get<Forecast[]>(this.actionUrl, { headers: this.headers });
    }
}