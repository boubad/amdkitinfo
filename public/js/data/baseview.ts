//baseview.ts
import {BaseModel} from './basemodel';
import {UserInfo} from './userinfo';
//
export class BaseView extends BaseModel {
	public in_activate: boolean = false;
	constructor(user: UserInfo) {
		super(user);
	}// constructor
	public refreshAll(): Promise<any> {
		return Promise.resolve(false);
	}
	protected get_isbusy_change():boolean {
		return this.in_activate || this.get_is_in_params_change();
	}// get_is_busy_change
	public activate(params?: any, config?: any, instruction?: any): any {
		this.in_activate = true;
		return this.perform_activate().then((x) => {
			return this.refreshAll();
		}).then((xr)=>{
			this.in_activate = false;
			return true;
		}).catch((e) => {
			this.in_activate = false;
			return false;
		});
	}// activate
} //class BaseView