//baseview.ts
import {BaseModel} from './basemodel';
import {UserInfo} from './userinfo';
//
export class BaseView extends BaseModel {
	private _in_activate: boolean;
	constructor(user: UserInfo) {
		super(user);
	}// constructor
	protected get in_activate(): boolean {
		if ((this._in_activate !== undefined) && (this._in_activate !== null) &&
			(this._in_activate == true)) {
			return true;
		}
		if (this.is_in_departement_change || this.is_in_annee_change ||
			this.is_in_unite_change || this.is_in_groupe_change || this.is_in_semestre_change ||
			this.is_in_matiere_change) {
			return true;
		}
		return false;
	}
	protected set in_activate(s: boolean) {
		this._in_activate = s;
	}
	public refreshAll(): Promise<any> {
		return Promise.resolve(false);
	}
	public activate(params?: any, config?: any, instruction?: any): any {
		this.in_activate = true;
		return this.perform_activate().then((x) => {
			this.in_activate = false;
			return this.refreshAll();
		}).catch((e) => {
			this.in_activate = false;
			return false;
		});
	}// activate
} //class BaseView