import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Protocol } from '../Protocol';
import { UrlProvider } from '../url/url';

/*
  Generated class for the OpcUaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OpcUaProvider {

  urlSuffix = 'call';

  constructor(public http: HttpClient,
    public urlProvider: UrlProvider) {

  }

  illuminateAllSlots(color: string, opcServerIp?: string): Subscription {
    const methodPath = ['0:Objects', '3:art_net', '3:node_1_illuminate_all'];
    return this.callOpcUaBridge(methodPath, opcServerIp, [color]);
  }

  allOff(opcServerIp?: string): Subscription {
    const methodPath = ['0:Objects', '3:art_net', '3:node_1_all_off'];
    return this.callOpcUaBridge(methodPath, opcServerIp);
  }

  callOpcUaBridge(opcMethodPath: string[], opcServerIp?: string | Observable<string>, params?: any[], opcServerPort?: string): Subscription {
    const webServiceUrl = this.urlProvider.build(Protocol.HTTP);
    const opcUaUrl = this.urlProvider.build(Protocol.OPCUA, opcServerIp, opcServerPort);

    return forkJoin(webServiceUrl, opcUaUrl).subscribe(resultArray => {
      const serviceUrl = `${resultArray['0']}${this.urlSuffix}`;

      const body = this.createPostBody(opcMethodPath, resultArray['1'], params);
      return this.http.post(serviceUrl, body).subscribe();
    });
  }

  createPostBody(methodPath: string[], serviceUrl: string, params?: string[]): {} {
    if (params) {
      return {
        'methodPath': methodPath,
        'serverUrl': serviceUrl,
        'params': [...params]
      };
    } else {
      return {
        'methodPath': methodPath,
        'serverUrl': serviceUrl
      };
    }
  }

}
