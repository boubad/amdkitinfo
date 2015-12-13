//depunite-bar.ts
import {BaseBar} from './basebar';
import {BaseModel} from '../../data/basemodel'
import {customElement} from 'aurelia-framework';
//
@customElement('depunite-bar')
export class DepartBar  extends BaseBar<BaseModel> {
    constructor() {
		super();
    }
    
}
