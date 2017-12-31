import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Help } from './help.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class HelpService {

    private resourceUrl = SERVER_API_URL + 'api/helps';

    constructor(private http: Http) { }

    create(help: Help): Observable<Help> {
        const copy = this.convert(help);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(help: Help): Observable<Help> {
        const copy = this.convert(help);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Help> {
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
     * Convert a returned JSON object to Help.
     */
    private convertItemFromServer(json: any): Help {
        const entity: Help = Object.assign(new Help(), json);
        return entity;
    }

    /**
     * Convert a Help to a JSON which can be sent to the server.
     */
    private convert(help: Help): Help {
        const copy: Help = Object.assign({}, help);
        return copy;
    }
}
