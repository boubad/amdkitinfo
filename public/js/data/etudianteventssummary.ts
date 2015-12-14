//etudianteventssummary.ts
//
import {IEtudiantEvent} from 'infodata';
import {SummaryItem, SummaryItemMap} from './summaryitem';
import {BaseEtudiantSumary} from './baseetudiantsummary';
import {EVT_NOTE} from './infoconstants';
import {IElementDesc} from 'infodata';
//
//
export class EtudiantEventsSummary extends BaseEtudiantSumary {
	//
	private _semestreEvents: Map<string, SummaryItemMap>;
	private _detailEvts: Map<string, IEtudiantEvent[]>;
	private _allevts: IEtudiantEvent[];
	private _sumevts: SummaryItem[];
	//
	constructor() {
		super();
	}// constructor
	//
	protected set_currentSemestre(s: IElementDesc) {
		super.set_currentSemestre(s);
	}
	public update_semestre() :void {
		let semid = (this.currentSemestre !== null) ? this.currentSemestre.id : null;
		this._allevts = this.get_semestre_all_evts(semid);
		this._sumevts = this.get_semestre_sum_evts(semid);
	}// update_semestre
	//
	public reset(): void {
		super.reset();
		this._semestreEvents = null;
		this._detailEvts = null;
		this._allevts = null;
		this._sumevts = null;
	}// reset
	//
	public get allEvts(): IEtudiantEvent[] {
		return ((this._allevts !== undefined) && (this._allevts !== null)) ? this._allevts : [];
	}
	public get sumEvts(): SummaryItem[] {
		return ((this._sumevts !== undefined) && (this._sumevts !== null)) ? this._sumevts : [];
	}
	public get has_allEvts(): boolean {
		return (this.allEvts.length > 0);
	}
	public get has_sumEvts(): boolean {
		return (this.sumEvts.length > 0);
	}
	//
	public add_event(evt: IEtudiantEvent): boolean {
		if (!super.add_event(evt)) {
			return false;
		}
		if (evt.genre == EVT_NOTE) {
			return false;
		}
		let semid = evt.semestreid;
		if ((this._detailEvts === undefined) || (this._detailEvts === null)) {
			this._detailEvts = new Map<string, IEtudiantEvent[]>();
		}
		if (!this._detailEvts.has(semid)) {
			this._detailEvts.set(semid, []);
		}
		let ae = this._detailEvts.get(semid);
		ae.push(evt);
		if ((this._semestreEvents === undefined) || (this._semestreEvents === null)) {
			this._semestreEvents = new Map<string, SummaryItemMap>();
		}
		let m: SummaryItemMap = null;
		if (!this._semestreEvents.has(semid)) {
			m = new SummaryItemMap(evt.semestreName);
			this._semestreEvents.set(semid, m);
		} else {
			m = this._semestreEvents.get(semid);
		}
		m.add(evt.genre, null, null, evt.description,evt.eventDate);
		return true;
	}// add_event
	public get_semestre_all_evts(semestreid: string): IEtudiantEvent[] {
		let oRet: IEtudiantEvent[] = [];
		if ((semestreid === undefined) || (semestreid === null)) {
			return oRet;
		}
		if ((this._detailEvts === undefined) || (this._detailEvts === null)) {
			return oRet;
		}
		if (this._detailEvts.has(semestreid)) {
			oRet = this._detailEvts.get(semestreid);
		}
		if (oRet.length > 1) {
			let x = oRet[0];
			let pf = x.sort_func;
			if ((pf !== undefined) && (pf !== null)) {
				oRet.sort(pf);
			}
		}
		return oRet;
	}// get_devoirs_notes
	public get_semestre_sum_evts(semestreid: string): SummaryItem[] {
		let oRet: SummaryItem[] = [];
		if ((semestreid === undefined) || (semestreid === null)) {
			return oRet;
		}
		if ((this._semestreEvents === undefined) || (this._semestreEvents === null)) {
			return oRet;
		}
		if (this._semestreEvents.has(semestreid)) {
			let v = this._semestreEvents.get(semestreid);
			oRet = v.values;
		}
		return oRet;
	}// get_matieres_notes
	
}// class EtudiantEventsSummary
