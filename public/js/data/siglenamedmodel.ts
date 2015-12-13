//siglenamedmodel.ts
//
import {UserInfo} from './userinfo';
import {BaseEditViewModel} from './baseeditmodel';
import {ISigleNamedItem,IUIManager} from 'infodata';
//
export class SigleNamedViewModel<T extends ISigleNamedItem> extends BaseEditViewModel<T> {
    //
    constructor(info: UserInfo) {
        super(info);
    }// constructor
    //
    public get sigle(): string {
        return this.currentItem.sigle;
    }
    public set sigle(s: string) {
       this.currentItem.sigle = s;
    }
    public get name(): string {
        return this.currentItem.name;
    }
    public set name(s: string) {
       this.currentItem.name = s;
    }

}// class BaseEditViewModel
