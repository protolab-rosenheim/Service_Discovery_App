import { Injectable } from '@angular/core';
import { AppPreferences } from '@ionic-native/app-preferences';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';

/*
  Generated class for the AppPreferencesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppPreferencesProvider {

  fallbackServiceDiscoveryUrl = 'servicediscovery.domain.de';

  constructor(public appPreferences: AppPreferences, public platform: Platform) {

  }

  getServiceUrl(): Observable<string> {
    return this.fetchKey('ServiceDiscoveryUrl', this.fallbackServiceDiscoveryUrl);
  }

  fetchKey<T>(key: string, fallback: T): Observable<T> {
    if (this.platform.is('cordova')) {
      // Our platform does support AppPreferences
      return this.wrapInObservable(this.appPreferences.fetch(key));
    } else {
      // Fallback for testing our app with `ionic serve` -> AppPreferences are not supported
      return this.wrapInObservable(fallback);
    }
  }

  wrapInObservable<T>(toBeWrapped: T | Promise<T>): Observable<T> {
    if (toBeWrapped instanceof Promise) {
      return fromPromise<T>(toBeWrapped);
    } else {
      return of<T>(toBeWrapped);
    }
  }
}
