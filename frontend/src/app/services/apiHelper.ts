import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import * as globalVariables from '../shared/globalVariables';

@Injectable()

export class ApiHelper {
    constructor(private http: Http) { }

    generateRequestOptionsJSON(): RequestOptions {
        const headers = new Headers({});
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        const options = new RequestOptions({ headers: headers });
        return options;
    }
    
}
