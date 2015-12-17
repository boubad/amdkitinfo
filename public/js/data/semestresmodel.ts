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
			 return this.activate_refresh();
		});
	}
	protected get_min_date(): string {
		return this.anneeMinDate;
	}
	protected get_max_date(): string {
		return this.anneeMaxDate;
	}
}// class SemestresModel
