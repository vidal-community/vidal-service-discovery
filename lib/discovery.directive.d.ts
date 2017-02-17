import { TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { DiscoveryService } from './discovery.service';
export declare class DiscoveryDirective implements OnInit {
    private _viewContainer;
    private _template;
    private discovery;
    serviceDiscovery: string;
    serviceDiscoveryParams: any;
    serviceDiscoveryTarget: string;
    private _hasView;
    private service;
    constructor(_viewContainer: ViewContainerRef, _template: TemplateRef<Object>, discovery: DiscoveryService);
    onClick(e: any): void;
    ngOnInit(): void;
    private show();
    private hide();
}
