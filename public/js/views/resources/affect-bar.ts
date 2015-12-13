//affect-bar.ts
import {BaseBar} from './basebar';
import {BaseModel} from '../../data/basemodel'
import {customElement} from 'aurelia-framework';
//
@customElement('affect-bar')
export class AffectBar  extends BaseBar<BaseModel> {
    constructor() {
		super();
    }
    
}
