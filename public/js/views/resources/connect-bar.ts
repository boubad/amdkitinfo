//connect-bar.ts
//
import {customElement} from 'aurelia-framework';
import {BaseBar} from './basebar';
import {BaseModel} from '../../data/basemodel';
//
@customElement('connect-bar')
export class ConnectBar extends BaseBar<BaseModel>{
  constructor() {
	  super();
  }
}// class ConnectBar
