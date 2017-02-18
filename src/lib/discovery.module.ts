import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule, Http } from '@angular/http';

import { DiscoveryService, DISCOVERY_SERVICE_CONFIG } from './discovery.service';
// import { DiscoveryService } from './discovery.service';
import { DiscoveryDirective } from './discovery.directive';

@NgModule({
    imports: [HttpModule],
    declarations: [
        DiscoveryDirective
    ],
    exports: [DiscoveryDirective],
})
export class DiscoveryModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DiscoveryModule,
            providers: [
                {
                    provide: DISCOVERY_SERVICE_CONFIG,
                    useValue: { apiEndpoint: '/api/discovery' }
                }
            ]
        };
    }
 }
