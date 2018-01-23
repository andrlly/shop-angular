import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

    private baseUrl = 'http://ukiegoods.loc/';

    constructor(public http: Http) {
    }

    private setHeaders(): Headers {
        const headersConfig = {
            'Content-Type': 'application/json, multipart/form-data',
            'Accept': 'application/json'
        };
        return new Headers(headersConfig);
    }

    private getUrl(url: string = ''): string {
        return this.baseUrl + url;
    }

    public get(url: string = ''): Observable<any> {
        return this.http.get(this.getUrl(url))
            .map((response: Response) => response.json());
    }

    public post(url: string = '', body: Object = {}): Observable<any> {
        return this.http.post(this.getUrl(url), JSON.stringify(body), {headers: this.setHeaders()})
            .map((response: Response) => response.json());
    }

    public put(url: string = '', body: Object = {}): Observable<any> {
        return this.http.put(this.getUrl(url), JSON.stringify(body), {headers: this.setHeaders()})
            .map((response: Response) => response.json());
    }

}