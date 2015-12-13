//etudiantsummarymodel.ts
//
import {UserInfo} from './userinfo';
import {BaseDetailModel} from './baseitemdetail';
import {IElementDesc, IPerson, IEtudiantEvent, IUIManager, IBaseItem, IEtudiant} from 'infodata';
import {EtudiantNotesSummary} from './etudiantnotessummary';
import {EtudiantEventsSummary} from './etudianteventssummary';
import {SummaryItem, SummaryItemMap} from './summaryitem';
import {EVT_NOTE} from './infoconstants';
//
export class EtudiantSumaryModel extends BaseDetailModel<IEtudiant> {
    //
    private _evts: IEtudiantEvent[] = [];
	private _notesSum: EtudiantNotesSummary;
	private _evtsSum: EtudiantEventsSummary;
	//
	public infoMode: boolean = true;
	public noteMode: boolean = false;
	public evtMode: boolean = false;
	//
	private _xannees: IElementDesc[];
	private _xsemestres: IElementDesc[];
	private _xannee: IElementDesc;
	private _xsemestre: IElementDesc;
    //
    constructor(userinfo: UserInfo) {
        super(userinfo);
        this.title = "Détails Etudiant";
    }
	protected get notesSum(): EtudiantNotesSummary {
		if ((this._notesSum === undefined) || (this._notesSum == null)) {
			this._notesSum = new EtudiantNotesSummary();
		}
		return this._notesSum;
	}
	protected get evtsSum(): EtudiantEventsSummary {
		if ((this._evtsSum === undefined) || (this._evtsSum === null)) {
			this._evtsSum = new EtudiantEventsSummary();
		}
		return this._evtsSum;
	}
    public get etudiantid(): string {
		return (this.currentItem !== null) ? this.currentItem.id : null;
    }
	public get xannees(): IElementDesc[] {
		return ((this._xannees !== undefined) && (this._xannees !== null)) ? this._xannees : [];
	}
	public get xannee(): IElementDesc {
		return (this._xannee !== undefined) ? this._xannee : null;
	}
	public set xannee(s: IElementDesc) {
		this._xannee = (s !== undefined) ? s : null;
		this._xsemestres = [];
		this._xsemestre = null;
		this.notesSum.currentAnnee = this.xannee;
		for (let x of this._notesSum.semestresMenu) {
			this._xsemestres.push(x);
		}
		this.evtsSum.currentAnnee = this._xannee;
		for (let x of this.evtsSum.semestresMenu) {
			let bFound: boolean = false;
			let id = x.id;
			for (let y of this._xsemestres) {
				if (y.id == id) {
					bFound = true;
					break;
				}
			}
			if (!bFound) {
				this._xsemestres.push(x);
			}
		}// x
		if (this._xsemestres.length > 0) {
			this.xsemestre = this._xsemestres[0];
		}
	}
	public get xsemestres(): IElementDesc[] {
		return ((this._xsemestres !== undefined) && (this._xsemestres !== null)) ? this._xsemestres : [];
	}
	public get xsemestre(): IElementDesc {
		return (this._xsemestre !== undefined) ? this._xsemestre : null;
	}
	public set xsemestre(s: IElementDesc) {
		this._xsemestre = (s !== undefined) ? s : null;
		this.notesSum.currentSemestre = this._xsemestre;
		this.evtsSum.currentSemestre = this._xsemestre;
		this.notesSum.update_semestre();
		this.evtsSum.update_semestre();
		
	}
	public get devoirsNotes(): SummaryItem[] {
		return (this.notesSum !== null) ? this.notesSum.devoirsNotes : [];
	}
	public get has_devoirsNotes(): boolean {
		return (this.devoirsNotes.length > 0);
	}
	public get matieresNotes(): SummaryItem[] {
		return (this.notesSum !== null) ? this.notesSum.matieresNotes : [];
	}
	public get has_matieresNotes(): boolean {
		return (this.matieresNotes.length > 0);
	}
	public get unitesNotes(): SummaryItem[] {
		return (this.notesSum !== null) ? this.notesSum.unitesNotes : [];
	}
	public get has_unitesNotes(): boolean {
		return (this.unitesNotes.length > 0);
	}
	public get totalNotes(): SummaryItem[] {
		return (this.notesSum !== null) ? this.notesSum.totalNotes : [];
	}
	public get has_totalNotes(): boolean {
		return (this.totalNotes.length > 0);
	}
	public get allEvts(): IEtudiantEvent[] {
		return (this.evtsSum !== null) ? this.evtsSum.allEvts : [];
	}
	public get has_allEvts(): boolean {
		return (this.allEvts.length > 0);
	}
	public get sumEvts(): SummaryItem[] {
		return (this.evtsSum !== null) ? this.evtsSum.sumEvts : [];
	}
	public get has_sumEvts(): boolean {
		return (this.sumEvts.length > 0);
	}
	public get canInfoMode(): boolean {
		return (!this.infoMode) && (this.currentPerson !== null);
	}
	public get canNoteMode(): boolean {
		return (!this.noteMode) && this.has_devoirsNotes;
	}
	public get canEvtMode(): boolean {
		return (!this.evtMode) && this.has_allEvts;
	}
	public get canChoose(): boolean {
		return (this.has_allEvts || this.has_devoirsNotes);
	}
	public set_info(): void {
		this.infoMode = true;
		this.evtMode = false;
		this.noteMode = false;
	}
	public set_note(): void {
		this.infoMode = false;
		this.evtMode = false;
		this.noteMode = true;
	}
	public set_evts(): void {
		this.infoMode = false;
		this.evtMode = true;
		this.noteMode = false;
	}
	protected initialize_item(evtid: string): Promise<boolean> {
		return super.initialize_item(evtid).then((b) => {
			let id = this.etudiantid;
			this._evts = null;
			this._notesSum = null;
			this._evtsSum = null;
			if (id !== null) {
				return this.dataService.query_items(this.evtModel.type(), { etudiantid: id });
			} else {
				return Promise.resolve([]);
			}
		}).then((xx: IEtudiantEvent[]) => {
			this._evts = ((xx !== undefined) && (xx !== null)) ? xx : [];
			this._notesSum = new EtudiantNotesSummary();
			this._evtsSum = new EtudiantEventsSummary();
			for (let x of this._evts) {
				if (x.genre == EVT_NOTE) {
					this._notesSum.add_event(x);
				} else {
					this._evtsSum.add_event(x);
				}
			}// x
			this._notesSum.end_processing();
			this._xannees = [];
			for (let y of this._notesSum.anneesMenu) {
				this._xannees.push(y);
			}
			for (let xx of this._evtsSum.semestresMenu) {
				let bFound: boolean = false;
				let id = xx.id;
				for (let yy of this._xannees) {
					if (yy.id == id) {
						bFound = true;
						break;
					}
				}
				if (!bFound) {
					this._xannees.push(xx);
				}
			}// x
			if (this._xannees.length > 0) {
				this.xannee = this._xannees[0];
			}
			return true;
		});
	}//initialize_item
}// class EtudDetail
