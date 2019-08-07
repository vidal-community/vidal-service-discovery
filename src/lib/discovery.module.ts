import {ModuleWithProviders, NgModule} from '@angular/core';

import {DISCOVERY_SERVICE_CONFIG, DiscoveryService} from './discovery.service';
import {DiscoveryDirective} from './discovery.directive';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule],
  declarations: [
    DiscoveryDirective
  ],
  exports: [DiscoveryDirective],
})
export class DiscoveryModule {
  static forRoot(apiEndpoint): ModuleWithProviders {
    return {
      ngModule: DiscoveryModule,
      providers: [
        DiscoveryService,
        {
          provide: DISCOVERY_SERVICE_CONFIG,
          useValue: {apiEndpoint}
        }
      ]
    };
  }
}
