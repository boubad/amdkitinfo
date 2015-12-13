//pagination-bar.ts
//
import {BaseConsultBar} from './baseconsultbar';
import {IBaseItem} from 'infodata';
import {customElement} from 'aurelia-framework';
//
@customElement('pagination-bar')
export class PaginationBar extends BaseConsultBar<IBaseItem> {
    constructor() {
        super();
    }
}
