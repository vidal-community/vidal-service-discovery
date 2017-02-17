import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';

import { DiscoveryService, DISCOVERY_SERVICE_CONFIG } from './discovery.service';
import { DiscoveryDirective } from './discovery.directive';

@NgModule({
    imports: [HttpModule],
    declarations: [
        DiscoveryDirective
    ],
    exports: [DiscoveryDirective],
})
export class DiscoveryModule {
    static forRoot(apiEndpoint: string): ModuleWithProviders {
        return {
            ngModule: DiscoveryModule,
            providers: [
                DiscoveryService,
                { provide: DISCOVERY_SERVICE_CONFIG, useValue: { apiEndpoint } }
            ]
        };
    }
 }
