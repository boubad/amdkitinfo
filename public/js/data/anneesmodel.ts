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
            return this.activate_refresh();
		});
    }
    protected create_item(): IAnnee {
        return this.itemFactory.create_annee({
			departementid:this.departementid
		});
    }
	protected prepare_model(): any {
		return {type: this.modelItem.type(),
			departementid:this.departementid};
	}// prepare_model
	protected get_min_date(): string {
		return null;
	}
	protected get_max_date():string {
		return null;
	}
}// class AnneesModel
