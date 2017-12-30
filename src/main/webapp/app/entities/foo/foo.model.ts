import { BaseEntity } from './../../shared';

export class Foo implements BaseEntity {
    constructor(
        public id?: number,
        public fileUploadContentType?: string,
        public fileUpload?: any,
    ) {
    }
}
