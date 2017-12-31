import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Bar } from './bar.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BarService {

    private resourceUrl = SERVER_API_URL + 'api/bars';

    constructor(private http: Http) { }

    create(bar: Bar): Observable<Bar> {
        const copy = this.convert(bar);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(bar: Bar): Observable<Bar> {
        const copy = this.convert(bar);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Bar> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Bar.
     */
    private convertItemFromServer(json: any): Bar {
        const entity: Bar = Object.assign(new Bar(), json);
        return entity;
    }

    /**
     * Convert a Bar to a JSON which can be sent to the server.
     */
    private convert(bar: Bar): Bar {
        const copy: Bar = Object.assign({}, bar);
        return copy;
    }
}
