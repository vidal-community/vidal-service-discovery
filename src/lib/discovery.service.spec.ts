/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { DiscoveryService, DISCOVERY_SERVICE_CONFIG } from './discovery.service';
import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';

describe('DiscoveryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],

      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
            return new Http(backend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        { provide: DISCOVERY_SERVICE_CONFIG, useValue: { apiEndpoint: 'http://discovery/api' } },
        DiscoveryService]
    });
  });

  it('should ...', inject([DiscoveryService, MockBackend], (discovery: DiscoveryService, backend: MockBackend) => {  
    backend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(
        new ResponseOptions({ body: `{"/search/product/drv-keeper":{"description":"Recherche des spécialités dont il existe des drvs","url":"http://drv-keeper.vidal.net/#/product-search?searchName=%s","shortDescription":"Recherche de spécialité","name":"search/product","meta":{}},

        "/search/infos/QUERY/vidal-value":{"description":"Recherche d'info value","url":"http://vidal-value.vidal.net/#/search?searchText=%s","shortDescription":"Recherche d'info value","name":"search/infos/QUERY","meta":{}},
        
        "/search/mono/QUERY/foo":{"description":"Recherche de foo","url":"http://foobar/","shortDescription":"Recherche de foo","name":"search/foo/QUERY","meta":{}}}`})
      ));
    })
    const services = discovery.services('/toto', ['plop']).toPromise().then((services) =>
      expect(services.length).toEqual(2)
    );
  }));
});
