//etudnotesmodel.ts
//
import {UserInfo} from './userinfo';
import {BaseDetailModel} from './baseitemdetail';
import {IPerson, IEtudiantEvent, IBaseItem, IDisplayEtudiant,
IDepartement, IAnnee, ISemestre, IEtudiant} from 'infodata';
import { MatiereDisplayEtudiantsArray, UniteDisplayEtudiantsArray} from './displayetudiant';
import {EVT_NOTE} from './infoconstants';
//
export class BaseEtudiantNotesModel extends BaseDetailModel<IEtudiant> {
	//
    private _evts: IEtudiantEvent[];
    private _matieresNotes: IDisplayEtudiant[];
    private _unitesNotes: IDisplayEtudiant[];
    private _xdepartements: IDepartement[];
    private _xdepartement: IDepartement = null;
    private _xannee: IAnnee = null;
    private _xsemestre: ISemestre = null;
    private _xannees: IAnnee[] = [];
    private _xsemestres: ISemestre[] = [];
    private _zannees: IAnnee[] = [];
    private _zsemestres: ISemestre[] = [];
    //
    constructor(userinfo: UserInfo) {
        super(userinfo);
        this.title = "Notes Etudiant";
    }
	public get xdepartements(): IDepartement[] {
		if ((this._xdepartements === undefined) || (this._xdepartements === null)) {
			this._xdepartements = [];
		}
		return this._xdepartements;
	}
	public get unitesNotes(): IDisplayEtudiant[] {
		if ((this._unitesNotes === undefined) || (this._unitesNotes === null)) {
			this._unitesNotes = [];
		}
		return this._unitesNotes;
	}
	public get matieresNotes(): IDisplayEtudiant[] {
		if ((this._matieresNotes === undefined) || (this._matieresNotes === null)) {
			this._matieresNotes = [];
		}
		return this._matieresNotes;
	}
	public get evts(): IEtudiantEvent[] {
		if ((this._evts === undefined) || (this._evts === null)) {
			this._evts = [];
		}
		return this._evts;
	}
    public get etudiantid(): string {
		return (this.currentItem !== null) ? this.currentItem.id : null;
    }
	protected initialize_item(evtid: string): Promise<boolean> {
		return super.initialize_item(evtid).then((b) => {
			return this.init_etud_data();
		});
	}// initialize_item
    protected init_etud_data(): Promise<any> {
        this._xdepartements = [];
        this._xdepartement = null;
        this._xannees = [];
        this._xannee = null;
        this._xsemestres = [];
        this._xsemestre = null;
        this._zannees = [];
        this._zsemestres = [];
        let service = this.dataService;
        return service.get_items_array(this.currentPerson.departementids).then((dd: IDepartement[]) => {
			this._xdepartements = dd;
			return service.get_items_array(this.currentPerson.anneeids);
        }).then((aa: IAnnee[]) => {
			this._xannees = aa;
			return service.get_items_array(this.currentPerson.semestreids);
        }).then((ss: ISemestre[]) => {
			this._xsemestres = ss;
			if (this.xdepartements.length > 0) {
				this.xdepartement = this.xdepartements[0];
			} else {
				this.xdepartement = null;
			}
			return true;
        });
    }// initi_etud_data
    public get xsemestres(): ISemestre[] {
		return ((this._zsemestres !== undefined) && (this._zsemestres !== null)) ? this._zsemestres : [];
    }
    public get xannees(): IAnnee[] {
		return ((this._zannees !== undefined) && (this._zannees !== null)) ? this._zannees : [];
    }
    public get xsemestre(): ISemestre {
		return (this._xsemestre !== undefined) ? this._xsemestre : null;
    }
    public set xsemestre(s: ISemestre) {
		let old = (this._xsemestre !== undefined) ? this._xsemestre : null;
		let cur = (s !== undefined) ? s : null;
		if (old !== cur) {
			this._xsemestre = cur;
			this.refresh_cur_data();
		}
    }
    public get xannee(): IAnnee {
		return (this._xannee !== undefined) ? this._xannee : null;
    }
    public set xannee(s: IAnnee) {
		let old = (this._xannee !== undefined) ? this._xannee : null;
		let cur = (s !== undefined) ? s : null;
		if (old !== cur) {
			this._xannee = cur;
			let xx: ISemestre[] = [];
			let id = (cur !== null) ? cur.id : null;
			for (let x of this._xsemestres) {
				if (x.anneeid == id) {
					xx.push(x);
				}
			}
			this._zsemestres = xx;
			if (this._zsemestres.length > 0) {
				this.xsemestre = this._zsemestres[0];
			} else {
				this.xsemestre = null;
			}
		}
    }
    public get xdepartement(): IDepartement {
		return (this._xdepartement !== undefined) ? this._xdepartement : null;
    }
    public set xdepartement(s: IDepartement) {
		let old = (this._xdepartement !== undefined) ? this._xdepartement : null;
		let cur = (s !== undefined) ? s : null;
		if (old !== cur) {
			this._xdepartement = cur;
			let xx: IAnnee[] = [];
			let id = (cur !== null) ? cur.id : null;
			for (let x of this._xannees) {
				if (x.departementid == id) {
					xx.push(x);
				}
			}
			this._zannees = xx;
			if (this._zannees.length > 0) {
				this.xannee = this._zannees[0];
			} else {
				this.xannee = null;
			}
		}
    }
    protected refresh_cur_data(): Promise<any> {
        this.evts = [];
        this._matieresNotes = [];
        this._unitesNotes = [];
        let semestreid = (this.xsemestre !== null) ? this.xsemestre.id : null;
        if ((this.currentItem === null) || (semestreid === null) || (this.currentPerson === null)) {
            return Promise.resolve(true);
        }
        let service = this.dataService;
        let id = this.currentPerson.id;
		let sel: any = { semestreid: semestreid, genre: EVT_NOTE };
        return service.query_items(this.evtModel.type(), sel).then((xx: IEtudiantEvent[]) => {
            this._evts = xx;
			let oMat: MatiereDisplayEtudiantsArray = new MatiereDisplayEtudiantsArray();
			if ((this._evts !== undefined) && (this._evts !== null)) {
				for (let x of this._evts) {
					oMat.add_event(x);
				}
			}// evts
            this._matieresNotes = oMat.get_etudiantdisplays();
            let oUnite: UniteDisplayEtudiantsArray = new UniteDisplayEtudiantsArray();
            for (let z of this.matieresNotes) {
                oUnite.add_event(z);
            }
            this._unitesNotes = oUnite.get_etudiantdisplays();
            return true;
        });
    }// refresh_data
    protected post_update_semestre(): Promise<any> {
		if (!this.in_activate) {
			return this.refresh_cur_data();
		} else {
			return Promise.resolve(true);
		}
    }
}// class EtudDetail
