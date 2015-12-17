//noteslistmodel.ts
//
import {UserInfo} from './userinfo';
import {BaseConsultViewModel} from './baseconsultmodel';
import {DisplayEtudiant, DisplayEtudiantsArray} from './displayetudiant';
import {IDisplayEtudiant, IEtudiantEvent} from 'infodata';
import {EVT_NOTE} from './infoconstants';
//
export class NoteListModel extends BaseConsultViewModel<IDisplayEtudiant> {
    //
    private _all_data: IDisplayEtudiant[] = [];
	private _evtModel: IEtudiantEvent;
    //
    constructor(userinfo: UserInfo) {
        super(userinfo);
        this.title = 'Notes Semestres';
		this._evtModel = this.itemFactory.create_etudiantevent();
    }// constructor
    protected post_update_semestre(): Promise<boolean> {
		return super.post_update_semestre().then((r) => {
			return this.activate_refresh();
		});
    }
    protected post_update_matiere(): Promise<boolean> {
		return super.post_update_matiere().then((r) => {
			if (this.is_not_busy) {
				return this.refreshAll();
			} else {
				return true;
			}
		});
    }
    protected is_refresh(): boolean {
        return (this.semestre !== null) && (this.matiere !== null);
    }
    protected prepare_refresh(): void {
        super.prepare_refresh();
        this._all_data = [];
    }
    private transform_data(pp: IEtudiantEvent[]): Promise<IDisplayEtudiant[]> {
		let nPers: string = null;
		if (this.is_etud) {
			nPers = this.personid;
		}
        let oRet: IDisplayEtudiant[] = [];
        if ((pp !== undefined) && (pp !== null)) {
            let grp: DisplayEtudiantsArray = new DisplayEtudiantsArray();
            //let ppx = this.filter_etudevents(pp);
            for (let p of pp) {
				if (p.genre == EVT_NOTE) {
					if (nPers == null) {
						grp.add_event(p);
					} else if (p.personid == nPers) {
						grp.add_event(p);
					}
				}// note
            }
            oRet = grp.get_etudiantdisplays();
        }// pp
        return Promise.resolve(oRet);
    }// transformData
	private get_semestre_matiere_notes(): Promise<IEtudiantEvent[]> {
		let oRet: IEtudiantEvent[] = [];
		return this.dataService.query_items(this._evtModel.type(),
			{ semestreid: this.semestreid, matiereid: this.matiereid, genre: EVT_NOTE }).then((xx: IEtudiantEvent[]) => {
				oRet = ((xx !== undefined) && (xx !== null)) ? xx : [];
				return oRet;
			}).catch((e) => {
				return oRet;
			});
	}//get_semestre_matiere_notes
    public refreshAll(): Promise<any> {
        this.prepare_refresh();
        if (!this.is_refresh()) {
            return Promise.resolve(true);
        }
		this.is_busy = true;
        let nc = this.itemsPerPage;
        return this.get_semestre_matiere_notes().then((pp: IEtudiantEvent[]) => {
            return this.transform_data(pp);
        }).then((zz: IDisplayEtudiant[]) => {
            this._all_data = zz;
			this.sort_array(this._all_data);
            let nt = this._all_data.length;
            let np = Math.floor(nt / nc);
            if ((np * nc) < nt) {
                ++np;
                this.pagesCount = np;
            }
            return this.refresh();
        });
    }// refreshAll
    public refresh(): Promise<any> {
        this.clear_error();
        this.items = [];
        if (!this.is_refresh()) {
            return Promise.resolve(true);
        }
        let nbItems = this._all_data.length;
        let nc = this.itemsPerPage;
        let istart = (this.currentPage - 1) * nc;
        if ((istart < 0) && (istart >= nbItems)) {
            return Promise.resolve(true);
        }
        let iend = istart + nc - 1;
        if (iend >= nbItems) {
            iend = nbItems - 1;
        }
        if ((iend < 0) && (iend >= nbItems)) {
            return Promise.resolve(true);
        }
		this.is_busy = true;
        let oRet: IDisplayEtudiant[] = [];
        let i = istart;
        while (i <= iend) {
            let p = this._all_data[i++];
            oRet.push(p);
        }// i
        let self = this;
        return this.retrieve_avatars(oRet).then((pp: IDisplayEtudiant[]) => {
            self.items = pp;
			this.pageStatus = this.get_pageStatus();
			this.is_busy = false;
            return true;
        }).catch((s)=>{
			this.is_busy = false;
            return false;
		})
    }// refresh
}// class BaseEditViewModel
