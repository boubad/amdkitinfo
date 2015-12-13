//work-bar.ts
import {BaseBar} from './basebar';
import {BaseModel} from '../../data/basemodel'
import {customElement} from 'aurelia-framework';
//
@customElement('work-bar')
export class WoorkBar  extends BaseBar<BaseModel> {
    constructor() {
		super();
    }
    
}
