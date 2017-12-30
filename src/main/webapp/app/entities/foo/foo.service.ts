import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Foo } from './foo.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FooService {

    private resourceUrl = SERVER_API_URL + 'api/foos';

    constructor(private http: Http) { }

    create(foo: Foo): Observable<Foo> {
        const copy = this.convert(foo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(foo: Foo): Observable<Foo> {
        const copy = this.convert(foo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Foo> {
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
     * Convert a returned JSON object to Foo.
     */
    private convertItemFromServer(json: any): Foo {
        const entity: Foo = Object.assign(new Foo(), json);
        return entity;
    }

    /**
     * Convert a Foo to a JSON which can be sent to the server.
     */
    private convert(foo: Foo): Foo {
        const copy: Foo = Object.assign({}, foo);
        return copy;
    }
}
