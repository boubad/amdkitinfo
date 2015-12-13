//header-bar.ts
//
import {BaseBar} from './basebar';
import {BaseModel} from '../../data/basemodel';
import {customElement} from 'aurelia-framework';
//
@customElement('sheader-bar')
export class SheaderBar extends BaseBar<BaseModel> {
  constructor(){
	  super();
  }
  public get title(): string {
      return (this.parent !== null) ? this.parent.title : null;
  }
  public get error_message(): string {
      return (this.parent !== null) ? this.parent.error_message : null;
  }
  public get info_message(): string {
      return (this.parent !== null) ? this.parent.info_message : null;
  }
  public get has_error_message(): boolean {
      return (this.error_message !== null);
  }
  public get has_info_Message(): boolean {
      return (this.info_message !== null);
  }
  //
}
