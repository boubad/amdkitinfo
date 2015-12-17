//siglenamedmodel.ts
//
import {UserInfo} from './userinfo';
import {BaseEditViewModel} from './baseeditmodel';
import {ISigleNamedItem, IUIManager} from 'infodata';
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
	public get isEditable(): boolean {
		return this.is_admin || this.is_super;
    }
	public set isEditable(b:boolean){}
    public canActivate(params?: any, config?: any, instruction?: any): any {
		return (this.is_super || this.is_admin);
    }// activate
}// class BaseEditViewModel
