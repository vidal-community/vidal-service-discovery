import {Inject, Injectable, InjectionToken} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {filter, map, mergeMap} from 'rxjs/operators';
import {HttpClient, HttpResponse} from '@angular/common/http';

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

  constructor(private http: HttpClient,
              @Inject(DISCOVERY_SERVICE_CONFIG) private discoveryServiceConfig: any) {
    this.environmentInit();
  }

  private filterPath(filterPath: string): string {
    const url = this.discoveryServiceConfig.apiEndpoint.replace(/\/$/, '');
    return url + '/services/' + filterPath.replace(/^\//, '');
  }

  private serviceFilter(service: Service, params): boolean {
    if (Array.isArray(params)) {
      return (service.url.match(/%s/g) || []).length === params.length;
    }
    return !!(Object.keys(params).find((key) => service.url.indexOf('{' + key + '}') !== -1));
  }

  private serviceParamsInjection(service: Service, params): Service {
    let url;
    if (Array.isArray(params)) {
      url = params.reduce((urlAcc, param) =>
        urlAcc.replace('%s', encodeURIComponent(param)), service.url);
    } else {
      url = params.reduce((urlAcc, param) =>
        urlAcc.replace(new RegExp('\{\{' + param + '\}\}', 'g'), encodeURIComponent(params[param])), service.url);
    }
    return Object.assign({}, service, {url: url});
  }

  services(filterPath: string, params = []): Observable<Service[]> {
    return this.http
      .get<Service[]>(this.filterPath(filterPath))
      .pipe(map(services => Object.keys(services).map(k => services[k])
        .filter((service: Service) => this.serviceFilter(service, params))
        .map(service => this.serviceParamsInjection(service, params))
      ));
  }

  first(filterPath: string, params): Observable<Service> {
    return this.services(filterPath, params)
      .pipe(filter(services => services.length > 0))
      .pipe(map(services => services[0]));
  }

  call<T>(filterPath: string, params): Observable<T> {
    return this.first(filterPath, params)
      .pipe(mergeMap(service => this.http.get<T>(service.url)));
  }

  callRaw(filterPath: string, params): Observable<HttpResponse<any>> {
    return this.first(filterPath, params)
      .pipe(mergeMap(service => this.http.get<any>(service.url)));
  }

  environment(refresh = false): Observable<string> {
    if (refresh) {
      this.http
        .get(this.envUrl,{responseType: 'text'})
        .subscribe(env => this.environment$.next(env));
    }
    return this.environment$;
  }

  private environmentInit() {
    this.envUrl = this.discoveryServiceConfig.apiEndpoint.replace(/\/$/, '') + '/environment';
    this.environment(true);
  }
}
