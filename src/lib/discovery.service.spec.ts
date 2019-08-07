/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {DISCOVERY_SERVICE_CONFIG, DiscoveryService} from './discovery.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';

describe('DiscoveryService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: DISCOVERY_SERVICE_CONFIG, useValue: {apiEndpoint: 'http://discovery/api'}},
        DiscoveryService]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should ...', inject([DiscoveryService], (discovery: DiscoveryService) => {
    const mockedServices = {
      '/search/product/drv-keeper':
        {
          'description': 'Recherche des spécialités dont il existe des drvs',
          'url': 'http://drv-keeper.vidal.net/#/product-search?searchName=%s',
          'shortDescription': 'Recherche de spécialité',
          'name': 'search/product',
          'meta': {}
        },
      '/search/infos/QUERY/vidal-value':
        {
          'description': 'Recherche d\'info value',
          'url': 'http://vidal-value.vidal.net/#/search?searchText=%s',
          'shortDescription': 'Recherche d\'info value',
          'name': 'search/infos/QUERY',
          'meta': {}
        },
      '/search/mono/QUERY/foo':
        {
          'description': 'Recherche de foo',
          'url': 'http://foobar/',
          'shortDescription': 'Recherche de foo',
          'name': 'search/foo/QUERY',
          'meta': {}
        }
    };

    discovery.services('/toto', ['plop']).toPromise().then((services) => {
        expect(services.length).toEqual(2);
      });

    httpTestingController.expectOne('http://discovery/api/environment');

    const req = httpTestingController.expectOne('http://discovery/api/services/toto');

    req.flush(mockedServices);

    httpTestingController.verify();
  }));
});
