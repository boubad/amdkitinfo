//depsiglenamemodel.ts
//
import {UserInfo} from './userinfo';
import {SigleNamedViewModel} from './siglenamedmodel';
import {IDepartementSigleNamedItem} from 'infodata';
//
export class DepSigleNameViewModel<T extends IDepartementSigleNamedItem>
	extends SigleNamedViewModel<T> {
    //
    constructor(info: UserInfo) {
        super(info);
    }// constructor
    //
    protected is_refresh(): boolean {
        return (this.departementid !== null);
    }
	 protected prepare_model(): any {
		return {type: this.modelItem.type(),
			departementid:this.departementid};
	}// prepare_model
    protected post_update_departement(): Promise<boolean> {
		return super.post_update_departement().then((r)=>{
			this.modelItem.departementid = this.departementid;
            return this.activate_refresh();
		});
    }
}// class BaseEditViewModel
