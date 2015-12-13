//anneesmodel.ts
//
import {UserInfo} from './userinfo';
import {IntervalledViewModel} from './intervalmodel';
import {IAnnee} from 'infodata';
//
export class AnneesModel extends IntervalledViewModel<IAnnee> {
	//
    constructor(info:UserInfo) {
        super(info);
        this.title = 'Années';
    }// constructor
	 protected is_refresh(): boolean {
        return (this.departementid !== null);
    }
    protected post_update_departement(): Promise<boolean> {
		return super.post_update_departement().then((r)=>{
			this.modelItem.departementid = this.departementid;
        this.currentItem = this.create_item();
		if (!this.in_activate){
			return this.refreshAll();
		} else {
			return Promise.resolve(true);
		}
		});
    }
	protected perform_activate():Promise<any> {
		return super.perform_activate().then((r)=>{
			let old = this.departement;
			let id = (old !== null) ? old.id : null;
			this.departement = null;
			this.departement = this.sync_array(this.departements,id);
			return true;
		});
	}// perform_activate
    protected create_item(): IAnnee {
        return this.itemFactory.create_annee({
			departementid:this.departementid
		});
    }
	protected prepare_model(): any {
		return {type: this.modelItem.type(),
			departementid:this.departementid};
	}// prepare_model
    public get isEditable(): boolean {
		return this.is_admin || this.is_super;
    }
    public canActivate(params?: any, config?: any, instruction?: any): any {
		let bRet: boolean = false;
		if (this.is_connected) {
			bRet = this.is_admin || this.is_super;
		}
		return bRet;
    }// activate
	protected get_min_date(): string {
		return null;
	}
	protected get_max_date():string {
		return null;
	}
}// class AnneesModel
