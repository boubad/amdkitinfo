//groupeeventdetailmodel.ts
//
import {UserInfo} from './userinfo';
import {EventDetailModel} from './eventdetailmodel';
import {EVT_NOTE} from './infoconstants';
import {IGroupeEvent, IEtudiantEvent, IEnseignantAffectation} from 'infodata';

export class GroupeEventDetailModel extends EventDetailModel<IGroupeEvent> {
	//
	private _notes: IEtudiantEvent[];
	private _evts: IEtudiantEvent[];
	//
	constructor(userinfo: UserInfo) {
		super(userinfo);
		this.title = "Détails Devoirs";
	}
	public get notes(): IEtudiantEvent[] {
		if ((this._notes === undefined) || (this._notes === null)) {
			this._notes = [];
		}
		return this._notes;
	}
	public get evts(): IEtudiantEvent[] {
		if ((this._evts === undefined) || (this._evts === null)) {
			this._evts = [];
		}
		return this._evts;
	}
	protected initialize_item(evtid: string): Promise<boolean> {
		return super.initialize_item(evtid).then((b) => {
			let pp: IGroupeEvent = this.currentItem;
			if (pp === null) {
				this.currentItem = this.itemFactory.create_groupeevent();
				this.title = "Détails Devoirs";
			} else {
				this.title = this.currentItem.name;
			}
			let affid = this.currentItem.profaffectationid;
			return this.dataService.find_item_by_id(affid);
		}).then((paff: IEnseignantAffectation) => {
			if ((paff !== undefined) && (paff !== null)) {
				let d = paff.startDate;
				if ((d !== undefined) && (d !== null)) {
					this.minDate = d.toISOString().substr(0, 10);;
				}
				d = paff.endDate;
				if ((d !== undefined) && (d !== null)) {
					this.maxDate = d.toISOString().substr(0, 10);;
				}
				if (this.is_prof){
					let cont = this.person.affectationids;
					this.canEdit = this.contains_array_id(cont,paff.id);
				}
			}// paff
			return this.fill_notes();
		});
	}// initialize_groupeevent
	private fill_notes(): Promise<any> {
		this._notes = [];
		this._evts = [];
		let x = this.currentItem;
		let id = (x !== null) ? x.id : null;
		if (id === null) {
			return Promise.resolve(true);
		}
		return this.dataService.query_items(this.evtModel.type(), { groupeeventid: id }).then((xx: IEtudiantEvent[]) => {
			return this.retrieve_avatars(xx);
		}).then((ee: IEtudiantEvent[]) => {
			if ((ee !== undefined) && (ee !== null)) {
				let xee = this.filter_etudevents(ee);
				for (let x of xee) {
					if (x.genre == EVT_NOTE) {
						this.add_item_to_array(this._notes, x);
					} else {
						this.add_item_to_array(this._evts, x);
					}
				}// e
			}// ee
			return true;
		});
	}
	private filter_etudevents(ee: IEtudiantEvent[]): IEtudiantEvent[] {
		let oRet: IEtudiantEvent[] = [];
		let nPers: string = null;
		if (this.is_etud) {
			nPers = this.personid;
		}
		if ((ee !== undefined) && (ee !== null) && (ee.length > 0)) {
			for (let x of ee) {
				if (nPers != null) {
					if (nPers == x.personid) {
						oRet.push(x);
					}
				} else {
					oRet.push(x);
				}
			}// e
		}// ee
		return oRet;
	}// filter_etudevents
	public get groupeEventId(): string {
		return (this.currentItem !== null) ? this.currentItem.id : null;
	}
	public get name(): string {
		return (this.currentItem !== null) ? this.currentItem.name : null;
	}
	public set name(s: string) {
		if (this.currentItem !== null) {
			this.currentItem.name = s;
		}
	}
	public get location(): string {
		return (this.currentItem !== null) ? this.currentItem.location : null;
	}
	public set location(s: string) {
		if (this.currentItem !== null) {
			this.currentItem.location = s;
		}
	}
	public get coefficient(): string {
		return (this.currentItem !== null) ? this.number_to_string(this.currentItem.coefficient) : "1";
	}
	public set coefficient(s: string) {
		if (this.currentItem !== null) {
			this.currentItem.coefficient = this.string_to_number(s);
		}
	}
	public get startTime(): string {
		return (this.currentItem !== null) ? this.currentItem.startTime : null;
	}
	public set startTime(s: string) {
		if (this.currentItem !== null) {
			this.currentItem.startTime = s;
		}
	}
	public get endTime(): string {
		return (this.currentItem !== null) ? this.currentItem.endTime : null;
	}
	public set endTime(s: string) {
		if (this.currentItem !== null) {
			this.currentItem.endTime = s;
		}
	}
}// class Profgroupeevents
