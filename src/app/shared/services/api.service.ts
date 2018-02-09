import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

    private baseUrl = 'http://ukiegoods.loc/';
    // private baseUrl = 'http://news.hbmdev.com/';

    constructor(private http: HttpClient) {
    }

    private setHeaders(): HttpHeaders {
        const headersConfig = {
            'Content-Type': 'application/json, multipart/form-data',
            'Accept': 'application/json'
        };
        return new HttpHeaders(headersConfig);
    }

    private getUrl(url: string = ''): string {
        return this.baseUrl + url;
    }

    public get(url: string = ''): Observable<any> {
        return this.http.get(this.getUrl(url));
    }

    public post(url: string = '', body: Object = {}): Observable<any> {
        return this.http.post(this.getUrl(url), JSON.stringify(body), {headers: this.setHeaders()});
    }

    public put(url: string = '', body: Object = {}): Observable<any> {
        return this.http.put(this.getUrl(url), JSON.stringify(body), {headers: this.setHeaders()});
    }

}