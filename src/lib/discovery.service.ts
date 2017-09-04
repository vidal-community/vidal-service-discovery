import { Injectable, Inject, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';


import { Http, Headers, Response } from '@angular/http';
import { ReplaySubject } from "rxjs/ReplaySubject";

export const DISCOVERY_SERVICE_CONFIG = new InjectionToken<DiscoveryServiceConfig>('service.discovery.config');

export interface DiscoveryServiceConfig {
  apiEndpoint: string;
}

export interface Service {
  name: string;
  url: string;
  description: string;
  shortDescription: string;
  meta: any;
}

@Injectable()
export class DiscoveryService {
  envUrl: string;
  environment$: ReplaySubject<string> = new ReplaySubject(1);
  constructor(private http: Http,
    @Inject(DISCOVERY_SERVICE_CONFIG) private discoveryServiceConfig: any
  ) { 
    this.environmentInit();
  }

  private filterPath(filter: string): string {
    const url = this.discoveryServiceConfig.apiEndpoint.replace(/\/$/, '');
    return url + '/services/' + filter.replace(/^\//, '');
  }

  private serviceFilter(service: Service, params): boolean {
    if (Array.isArray(params)){
      return (service.url.match(/%s/g) || []).length === params.length;
    }
    return !!(Object.keys(params).find((key) => service.url.indexOf('{' + key + '}') !== -1));
  }

  private serviceParamsInjection(service: Service, params): Service {
    let url;
    if (Array.isArray(params)){
      url = params.reduce((urlAcc, param) =>
        urlAcc.replace('%s', encodeURIComponent(param)), service.url);
    }else {
      url = params.reduce((urlAcc, param) =>
        urlAcc.replace(new RegExp('\{\{' + param + '\}\}', 'g'), encodeURIComponent(params[param])), service.url);
    }
    return Object.assign({}, service, { url: url });
  }

  services(filter: string, params = []): Observable<Service[]> {
    return this.http
      .get(this.filterPath(filter))
      .map(r => r.json())
      .map(sesvices => Object.keys(sesvices).map(k => sesvices[k])
        .filter((service: Service) => this.serviceFilter(service, params))
        .map(service => this.serviceParamsInjection(service, params))
      );

  }

  first(filter: string, params): Observable<Service> {
    return this.services(filter, params)
      .filter(sevices => sevices.length > 0)
      .map(sevices => sevices[0]);
  }

  call<T>(filter: string, params): Observable<T> {
    return this.first(filter, params)
      .mergeMap(service => this.http.get(service.url))
      .map(r => r.json());
  }

  callRaw(filter: string, params): Observable<Response> {
    return this.first(filter, params)
      .mergeMap(service => this.http.get(service.url));
  }

  environment(refresh = false): Observable<string> {
    if (refresh) {
      this.http.get(this.envUrl).map(r => r.text()).subscribe(env => this.environment$.next(env));
    }
    return this.environment$;
  }

  private environmentInit() {
    this.envUrl = this.discoveryServiceConfig.apiEndpoint.replace(/\/$/, '') + '/environment';
    this.http.get(this.envUrl).map(r => r.text()).subscribe(env => this.environment$.next(env));
  }
}
