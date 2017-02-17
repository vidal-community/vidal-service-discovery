"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
require('rxjs/Rx');
var http_1 = require('@angular/http');
exports.DISCOVERY_SERVICE_CONFIG = new core_1.OpaqueToken('service.discovery.config');
var DiscoveryService = (function () {
    function DiscoveryService(http, discoveryServiceConfig) {
        this.http = http;
        this.discoveryServiceConfig = discoveryServiceConfig;
    }
    DiscoveryService.prototype.filterPath = function (filter) {
        var url = this.discoveryServiceConfig.apiEndpoint.replace(/\/$/, '');
        return url + '/services/' + filter.replace(/^\//, '');
    };
    DiscoveryService.prototype.serviceFilter = function (service, params) {
        if (Array.isArray(params)) {
            return (service.url.match(/%s/g) || []).length === params.length;
        }
        return !!(Object.keys(params).find(function (key) { return service.url.indexOf('{' + key + '}') !== -1; }));
    };
    DiscoveryService.prototype.serviceParamsInjection = function (service, params) {
        var url;
        if (Array.isArray(params)) {
            url = params.reduce(function (urlAcc, param) {
                return urlAcc.replace('%s', encodeURIComponent(param));
            }, service.url);
        }
        else {
            url = params.reduce(function (urlAcc, param) {
                return urlAcc.replace(new RegExp('\{\{' + param + '\}\}', 'g'), encodeURIComponent(params[param]));
            }, service.url);
        }
        return Object.assign({}, service, { url: url });
    };
    DiscoveryService.prototype.services = function (filter, params) {
        var _this = this;
        if (params === void 0) { params = []; }
        return this.http
            .get(this.filterPath(filter))
            .map(function (r) { return r.json(); })
            .map(function (sesvices) { return Object.keys(sesvices).map(function (k) { return sesvices[k]; })
            .filter(function (service) { return _this.serviceFilter(service, params); })
            .map(function (service) { return _this.serviceParamsInjection(service, params); }); });
    };
    DiscoveryService.prototype.first = function (filter, params) {
        return this.services(filter, params)
            .filter(function (sevices) { return sevices.length > 0; })
            .map(function (sevices) { return sevices[0]; });
    };
    DiscoveryService.prototype.call = function (filter, params) {
        var _this = this;
        return this.first(filter, params)
            .mergeMap(function (service) { return _this.http.get(service.url); })
            .map(function (r) { return r.json(); });
    };
    DiscoveryService.prototype.callRaw = function (filter, params) {
        var _this = this;
        return this.first(filter, params)
            .mergeMap(function (service) { return _this.http.get(service.url); });
    };
    DiscoveryService.prototype.environment = function () {
        return this.http.get(this.filterPath('/environment')).map(function (r) { return r.text(); });
    };
    DiscoveryService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(exports.DISCOVERY_SERVICE_CONFIG)), 
        __metadata('design:paramtypes', [http_1.Http, Object])
    ], DiscoveryService);
    return DiscoveryService;
}());
exports.DiscoveryService = DiscoveryService;
//# sourceMappingURL=discovery.service.js.map