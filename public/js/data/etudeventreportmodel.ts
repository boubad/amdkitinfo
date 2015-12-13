//etudeventreportmodel.ts
//
import {UserInfo} from './userinfo';
import {SemestreReportBase} from './semestrereportmodel';
import {DisplayEtudiant, DisplayEtudiantsArray} from './displayetudiant';
import {IDisplayEtudiant, IEtudiantEvent} from 'infodata';
import {EVT_NOTE} from './infoconstants';
//
export class EtudEventReportModel extends SemestreReportBase {
    //
	private _evtModel:IEtudiantEvent;
	//
    constructor(info: UserInfo) {
        super(info);
        this.title = 'Evènements Semestres';
    }// constructor
	protected get evtModel():IEtudiantEvent {
		if ((this._evtModel === undefined) || (this._evtModel === null)){
			this._evtModel = this.itemFactory.create_etudiantevent();
		}
		return this._evtModel;
	}
	protected get_all_ids(): Promise<string[]> {
		let oRet: string[] = [];
		if (this.semestreid === null){
			return Promise.resolve(oRet);
		}
		return this.dataService.query_items(this.evtModel.type(),{semestreid:this.semestreid}).then((ee:IEtudiantEvent[]) => {
			if ((ee !== undefined) && (ee !== null)) {
				for (let p of ee) {
					if (p.genre != EVT_NOTE) {
						oRet.push(p.id);
					}
				}//p
			}// ee
			return oRet;
		});
	}// get_all_ids
    protected get_initial_events(): Promise<IEtudiantEvent[]> {
		let oRet: IEtudiantEvent[] = [];
		if (this.semestreid === null){
			return Promise.resolve(oRet);
		}
		return this.dataService.query_items(this.evtModel.type(),{semestreid:this.semestreid}).then((ee:IEtudiantEvent[]) => {
			if ((ee !== undefined) && (ee !== null)) {
				for (let p of ee) {
					if (p.genre != EVT_NOTE) {
						oRet.push(p);
					}
				}//p
			}// ee
			return oRet;
		});
    }
    protected transform_data(pp: IEtudiantEvent[]): Promise<IDisplayEtudiant[]> {
		let nPers: string = null;
		if (this.is_etud) {
			nPers = this.personid;
		}
        let oRet: IDisplayEtudiant[] = [];
        if ((pp !== undefined) && (pp !== null)) {
            let grp: DisplayEtudiantsArray = new DisplayEtudiantsArray();
            for (let p of pp) {
				if (nPers == null) {
					grp.add_event(p);
				} else if (p.personid == nPers) {
					grp.add_event(p);
				}
            }
            oRet = grp.get_sorted_etudiantdisplays();
        }// pp
        return Promise.resolve(oRet);
    }// transformData

}// class BaseEditViewModel
