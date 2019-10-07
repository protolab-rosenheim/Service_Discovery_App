import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppPreferencesProvider } from '../app-preferences/app-preferences';
import { UrlProvider } from '../url/url';
import { Protocol } from '../Protocol';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  constructor(public http: HttpClient,
    public appPreferencesProvider: AppPreferencesProvider,
    public urlProvider: UrlProvider) {
  }

  getSelectedDevices(): Observable<WebserviceResponse<Device>> {
    return this.urlProvider.build(Protocol.HTTP).
      mergeMap((webServiceUrl: string) => {
        const url = `${webServiceUrl}online-devices`;
        return this.http.get<WebserviceResponse<Device>>(url);
      });
  }
}
