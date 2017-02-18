"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var discovery_service_1 = require("./discovery.service");
var discovery_directive_1 = require("./discovery.directive");
var DiscoveryModule = DiscoveryModule_1 = (function () {
    function DiscoveryModule() {
    }
    DiscoveryModule.forRoot = function () {
        return {
            ngModule: DiscoveryModule_1,
            providers: [
                {
                    provide: discovery_service_1.DISCOVERY_SERVICE_CONFIG,
                    useValue: { apiEndpoint: '/api/discovery' }
                }
            ]
        };
    };
    return DiscoveryModule;
}());
DiscoveryModule = DiscoveryModule_1 = __decorate([
    core_1.NgModule({
        imports: [http_1.HttpModule],
        declarations: [
            discovery_directive_1.DiscoveryDirective
        ],
        exports: [discovery_directive_1.DiscoveryDirective],
    })
], DiscoveryModule);
exports.DiscoveryModule = DiscoveryModule;
var DiscoveryModule_1;
//# sourceMappingURL=discovery.module.js.map