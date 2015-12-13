//semestresmodel.ts
//
import {UserInfo} from './userinfo';
import {IntervalledViewModel} from './intervalmodel';
import {ISemestre} from 'infodata';
//
export class SemestresModel extends IntervalledViewModel<ISemestre> {
	//
    constructor(info: UserInfo) {
        super(info);
        this.title = 'Semestres';
    }// constructor
	protected create_item(): ISemestre {
        return this.itemFactory.create_semestre({
			anneeid:this.anneeid
		});
    }
	protected prepare_model(): any {
		return {type: this.modelItem.type(),
			anneeid:this.anneeid};
	}// prepare_model
	protected is_storeable():boolean{
		if ((this.currentItem !== null) && (this.currentItem.anneeid == null)){
			this.currentItem.anneeid = this.anneeid;
		}
		return super.is_storeable();
	}
	 protected is_refresh(): boolean {
		
        return (this.anneeid !== null);
    }
	protected post_update_annee():Promise<boolean>{
		return super.post_update_annee().then((r)=>{
			 this.modelItem.anneeid = this.anneeid;
        this.currentItem = this.create_item();
		if (!this.in_activate){
        	return this.refreshAll();
		} else {
			return Promise.resolve(false);
		}
		});
	}
	protected perform_activate():Promise<any> {
		return super.perform_activate().then((r)=>{
			if (this.annee == null){
				if (this.annees.length > 0){
					this.annee = this.annees[0];
				}
			}
			let old = this.annee;
			let id = (old !== null) ? old.id : null;
			this.annee = null;
			this.annee = this.sync_array(this.annees,id);
			this.modelItem.anneeid = this.anneeid;
        	this.currentItem = this.create_item();
			return true;
		});
	}// perform_activate
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
		return this.anneeMinDate;
	}
	protected get_max_date(): string {
		return this.anneeMaxDate;
	}
}// class SemestresModel
