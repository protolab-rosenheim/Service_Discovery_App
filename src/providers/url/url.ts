import { Injectable } from '@angular/core';
import { Protocol } from '../Protocol';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { AppPreferencesProvider } from '../app-preferences/app-preferences';

/*
  Generated class for the UrlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UrlProvider {

  webserviceProtocol = 'http';
  webservicePort = '5000';
  webserviceApiString = 'api';
  webserviceApiVersion = 'v1';

  opcUaProtocol = 'opc.tcp';
  opcUaPort = '4840';

  constructor(public appPreferences: AppPreferencesProvider) {

  }

  build(protocol: Protocol, ipAdress?: string | Observable<string>, port?: string): Observable<string> {
    if (ipAdress && typeof (ipAdress) === 'string') {
      return of(this.buildUrl(protocol, ipAdress, port));
    } else if (ipAdress && ipAdress instanceof Observable) {
      return ipAdress.pipe(map(ip => {
        return this.buildUrl(protocol, ip, port);
      }));
    } else {
      return this.appPreferences.getServiceUrl().pipe(map(ip => {
        // app-preferences cannot be load in browser build
        if (ip == null) {
          return this.buildUrl(protocol,  'servicediscovery.domain.de', port);
        }
        else {
          return this.buildUrl(protocol, ip, port);
        }
      }));
    }
  }

  private buildUrl(protocol: Protocol, ip: string, port?: string): string {
    if (protocol === Protocol.HTTP && port) {
      return `${this.webserviceProtocol}://${ip}:${port}/${this.webserviceApiString}/${this.webserviceApiVersion}/`;
    } else if (protocol === Protocol.HTTP) {
      return `${this.webserviceProtocol}://${ip}:${this.webservicePort}/${this.webserviceApiString}/${this.webserviceApiVersion}/`;
    } else if (protocol === Protocol.OPCUA && port) {
      return `${this.opcUaProtocol}://${ip}:${port}/`;
    } else {
      return `${this.opcUaProtocol}://${ip}:${this.opcUaPort}/`;
    }
  }

}

