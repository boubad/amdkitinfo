//baseetudsumary.ts
//
import {IElementDesc, IEtudiantEvent} from 'infodata';
import {ElementDesc} from './elementdesc';
//
import {SummaryItem, SummaryItemMap} from './summaryitem';
//
export class BaseEtudiantSumary {
	//
	protected _anneesIds: Map<string, string>;
	protected _anneesSigles: Map<string, string>;
	private _semestreids: Map<string, string>;
	//
	private _menuAnnees: IElementDesc[];
	private _menuSemestres: IElementDesc[];
	//
	private _currentAnnee: IElementDesc;
	private _currentSemestre: IElementDesc;
	
	//
	constructor() {
		this._currentAnnee = null;
		this._currentSemestre = null;
		this._anneesIds = new Map<string, string>();
		this._anneesSigles = new Map<string, string>();
		this._semestreids = new Map<string, string>();
	}// constructor
	public reset(): void {
		this._semestreids = null;
		this._anneesIds = null;
		this._anneesSigles = null;
		this._menuAnnees = null;
		this._menuSemestres = null;
		this._currentAnnee = null;
		this._currentSemestre = null;
	}// reset
	//
	public start_processing(): void {
		this.reset();
	}
	public end_processing(): void {
	}
	//
	protected post_update_semestre(): Promise<boolean> {
		return Promise.resolve(true);
	}// post_change_semestre
	//
	public get anneesMenu(): IElementDesc[] {
		if ((this._menuAnnees === undefined) || (this._menuAnnees === null)) {
			this._menuAnnees = [];
			if ((this._anneesIds !== undefined) && (this._anneesIds !== null)) {
				this._anneesIds.forEach((anneeid, semid) => {
					let xlabel = this._anneesSigles.get(anneeid);
					this._menuAnnees.push(new ElementDesc({ _id: anneeid, display: xlabel }));
				});
			}//
			if (this._menuAnnees.length > 0) {
				this._currentAnnee = this._menuAnnees[0];
			}
		}
		return this._menuAnnees;
	}
	public get currentAnnee(): IElementDesc {
		return (this._currentAnnee !== undefined) ? this._currentAnnee : null;
	}
	public set currentAnnee(s: IElementDesc) {
		if ((this._anneesIds === undefined) || (this._anneesIds === null)) {
			this._anneesIds = new Map<string, string>();
		}
		this._currentAnnee = (s !== undefined) ? s : null;
		this._currentSemestre = null;
		this._menuSemestres = [];
		let self = this;
		if (this._currentAnnee !== null) {
			let p: IElementDesc = null;
			let id = this._currentAnnee.id;
			this._anneesIds.forEach((anneeid, semid) => {
				if (anneeid == id) {
					let xlabel = self._semestreids.get(semid);
					self._menuSemestres.push(new ElementDesc({ _id: semid, display: xlabel }));
				}// id
			});
		}
		if (this._menuSemestres.length > 0) {
			this._currentSemestre = this._menuSemestres[0];
		}
	}
	public get semestresMenu(): IElementDesc[] {
		return ((this._menuSemestres !== undefined) && (this._menuSemestres !== null)) ?
			this._menuSemestres : [];
	}
	protected get_currentSemestre(): IElementDesc {
		return (this._currentSemestre !== undefined) ? this._currentSemestre : null;
	}
	protected set_currentSemestre(s: IElementDesc) {
		this._currentSemestre = (s !== undefined) ? s : null;
	}
	public get currentSemestre(): IElementDesc {
		return this.get_currentSemestre();
	}
	public set currentSemestre(s: IElementDesc) {
		this.set_currentSemestre(s);
	}
	//
	public add_events(evts: IEtudiantEvent[]): void {
		if ((evts !== undefined) && (evts !== null)) {
			for (let x of evts) {
				this.add_event(x);
			}
		}
	}
	//
	public add_event(evt: IEtudiantEvent): boolean {
		if ((evt === undefined) || (evt === null)) {
			return false;
		}
		let semid = evt.semestreid;
		let semestreSigle = evt.semestreName;
		let anneeid = evt.anneeid;
		let anneeSigle = evt.anneeName;
		if ((anneeid === undefined) || (anneeid === null) || (anneeSigle === undefined) ||
			(anneeSigle === null) || (semid === undefined) || (semid === null) ||
			(semestreSigle === undefined) || (semestreSigle === null)) {
			return false;
		}
		if ((evt.genre === undefined) || (evt.genre === null)) {
			return false;
		}
		if ((this._semestreids === undefined) || (this._semestreids === null)) {
			this._semestreids = new Map<string, string>();
		}
		if (!this._semestreids.has(semid)) {
			this._semestreids.set(semid, evt.semestreName);
		}
		if ((this._anneesIds === undefined) || (this._anneesIds === null)) {
			this._anneesIds = new Map<string, string>();
		}
		if (!this._anneesIds.has(semid)) {
			this._anneesIds.set(semid, anneeid);
		}
		if ((this._anneesSigles === undefined) || (this._anneesSigles === null)) {
			this._anneesSigles = new Map<string, string>();
		}
		if (!this._anneesSigles.has(anneeid)) {
			this._anneesSigles.set(anneeid, anneeSigle);
		}
		return true;
	}// add_event
}// class EtudiantEventsSummary