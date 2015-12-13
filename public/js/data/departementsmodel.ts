//departementsmodel.ts
//
import {UserInfo} from './userinfo';
import {SigleNamedViewModel} from './siglenamedmodel';
import {IDepartement} from 'infodata';
//
export class DepartementsModel extends SigleNamedViewModel<IDepartement> {
	//
    constructor(info: UserInfo) {
        super(info);
        this.title = 'Départements';
    }// constructor
    protected create_item(): IDepartement {
        return this.itemFactory.create_departement();
    }
	protected prepare_model(): any {
		return {type: this.modelItem.type()};
	}// prepare_model
    public get isEditable(): boolean {
		return this.is_super;
    }
	public save(): Promise<any> {
		return super.save().then((x)=>{
			this.userInfo.loginInfo.refresh_data();
		}).catch((e)=>{
			this.set_error(e);
		})
	}
	public remove(): Promise<any> {
		return super.remove().then((x)=>{
			this.userInfo.loginInfo.refresh_data();
		}).catch((e)=>{
			this.set_error(e);
		})
	}
    public canActivate(params?: any, config?: any, instruction?: any): any {
		let bRet: boolean = false;
		if (this.is_connected) {
			bRet = this.is_super;
		}
		return bRet;
    }// activate
}// class DepartementModel
