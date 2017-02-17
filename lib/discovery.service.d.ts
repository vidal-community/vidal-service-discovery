import { OpaqueToken } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { Http, Response } from '@angular/http';
export declare const DISCOVERY_SERVICE_CONFIG: OpaqueToken;
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
export declare class DiscoveryService {
    private http;
    private discoveryServiceConfig;
    constructor(http: Http, discoveryServiceConfig: DiscoveryServiceConfig);
    private filterPath(filter);
    private serviceFilter(service, params);
    private serviceParamsInjection(service, params);
    services(filter: string, params?: any[]): Observable<Service[]>;
    first(filter: string, params: any): Observable<Service>;
    call<T>(filter: string, params: any): Observable<T>;
    callRaw(filter: string, params: any): Observable<Response>;
    environment(): Observable<string>;
}
