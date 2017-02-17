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
var core_1 = require('@angular/core');
var discovery_service_1 = require('./discovery.service');
var DiscoveryDirective = (function () {
    function DiscoveryDirective(_viewContainer, _template, discovery) {
        this._viewContainer = _viewContainer;
        this._template = _template;
        this.discovery = discovery;
        this.serviceDiscoveryTarget = '_blank';
        this._hasView = false;
        this._viewContainer.clear();
    }
    DiscoveryDirective.prototype.onClick = function (e) {
        if (this.service) {
            e.preventDefault();
            e.stopPropagation();
            window.open(this.service.url, this.serviceDiscoveryTarget);
        }
    };
    DiscoveryDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.discovery
            .first(this.serviceDiscovery, this.serviceDiscoveryParams)
            .subscribe(function (service) {
            _this.service = service;
            _this.show();
        });
    };
    DiscoveryDirective.prototype.show = function () {
        var _this = this;
        if (!this._hasView) {
            this._hasView = true;
            var v = this._viewContainer.createEmbeddedView(this._template);
            v.rootNodes[0].onclick = function (e) { return _this.onClick(e); };
        }
    };
    DiscoveryDirective.prototype.hide = function () {
        if (this._hasView) {
            this._hasView = false;
            this._viewContainer.clear();
        }
    };
    __decorate([
        core_1.Input('serviceDiscovery'), 
        __metadata('design:type', String)
    ], DiscoveryDirective.prototype, "serviceDiscovery", void 0);
    __decorate([
        core_1.Input('serviceDiscoveryParams'), 
        __metadata('design:type', Object)
    ], DiscoveryDirective.prototype, "serviceDiscoveryParams", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DiscoveryDirective.prototype, "serviceDiscoveryTarget", void 0);
    DiscoveryDirective = __decorate([
        core_1.Directive({
            selector: '[serviceDiscovery]'
        }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.TemplateRef, discovery_service_1.DiscoveryService])
    ], DiscoveryDirective);
    return DiscoveryDirective;
}());
exports.DiscoveryDirective = DiscoveryDirective;
//# sourceMappingURL=discovery.directive.js.map