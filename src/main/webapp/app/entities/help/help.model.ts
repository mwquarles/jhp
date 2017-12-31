import { BaseEntity } from './../../shared';

export class Help implements BaseEntity {
    constructor(
        public id?: number,
        public entry?: string,
    ) {
    }
}
