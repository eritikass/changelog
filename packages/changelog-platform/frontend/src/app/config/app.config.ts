import { InjectionToken } from '@angular/core';
import { IAppConfig } from './iapp.config';
import { Links } from './links.config';
import { Endpoint } from './endpoint.config';
import { environment } from '@environments/environment';


export const APP_CONFIG = new InjectionToken('app.config');
export const LINKS = new Links(false);
export const API = new Endpoint(environment.api);
export const AppConfig: IAppConfig = {
    routes: {
        oem: 'oem',
        fleet: 'fleet',
        super: 'super',
        error404: '404',
    },
};


