import * as _ from 'lodash';

export class Links {
    private _activeLinks: any[];
    private _prod: boolean;
    private _links: any[] = [
        { label: 'DASHBOARD', path: 'oem/dash-board', prod: true},
        { label: 'DEVICELIST', path: 'oem/device-list', prod: true },
        { label: 'MESSAGES', path: 'oem/messages', prod: false },
        { label: 'MANAGE', path: 'oem/manage', prod: false },
    ];

    constructor(prod: boolean) {
        this._prod = prod;
    }

    get activeLinks(): any {
        return this._prod ? _.filter(this._links, ['prod', true]) : this._links;
    }
    
}
