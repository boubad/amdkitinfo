//etudianteventdetailmodel.ts
//
import {UserInfo} from './userinfo';
import {EventDetailModel} from './eventdetailmodel';
import {IGroupeEvent, IEtudiantEvent, IEtudiantAffectation} from 'infodata';
import {EVT_NOTE} from './infoconstants';
//
export class EtudiantEventDetailModel extends EventDetailModel<IEtudiantEvent> {
	//
    constructor(userinfo: UserInfo) {
        super(userinfo);
        this.title = "Détails Evènement";
    }
	protected initialize_item(evtid: string): Promise<boolean> {
		return super.initialize_item(evtid).then((b) => {
			let pp: IEtudiantEvent = this.currentItem;
			if (pp === null) {
				this.currentItem = this.itemFactory.create_etudiantevent();
				this.title = "Détails Evènement";
			} else {
				this.title = this.currentItem.fullname;
			}
			let gvtid = this.currentItem.groupeeventid;
			return this.dataService.find_item_by_id(gvtid);
		}).then((paff: IGroupeEvent) => {
			if ((paff !== undefined) && (paff !== null)) {
				if (this.is_prof) {
					let cont = this.person.eventids;
					this.canEdit = this.contains_array_id(cont, paff.id);
				}
			}// paff
			return true;
		});
	}
	public get groupeEventName(): string {
		return (this.currentItem !== null) ? this.currentItem.groupeEventName : null;
	}
	public get groupeeventid():string {
		return (this.currentItem !== null) ? this.currentItem.groupeeventid : null;
	}
	public get etudiantid():string {
		return (this.currentItem !== null) ? this.currentItem.etudiantid : null;
	}
    public get note(): string {
		return (this.currentItem !== null) ? this.number_to_string(this.currentItem.note) : null;
    }
    public set note(s: string) {
        if (this.currentItem !== null) {
			this.currentItem.note = this.string_to_number(s);
		}
    }

}// EtudEventDetailModel