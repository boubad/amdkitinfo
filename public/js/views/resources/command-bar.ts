//command-bar.ts
//
import {BaseEditBar} from './baseeditbar';
import {IBaseItem} from 'infodata';
import {customElement} from 'aurelia-framework';
//
@customElement('command-bar')
export class CommandBar extends BaseEditBar<IBaseItem> {
    constructor() {
        super();
    }
}
