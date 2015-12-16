//infoevent.ts
import {IEtudiantEvent, IPerson} from 'infodata';
import {InfoEvent} from './infoevent';
import {ETUDEVENT_TYPE, ETUDEVENT_PREFIX} from './infoconstants';
//
//
export class EtudiantEvent extends InfoEvent implements IEtudiantEvent {
	private _groupeeventid: string;
    private _etudiantaffectationid: string;
	private _etudiantid: string;
    private _note: number;
	private _groupeEventName: string;
	private _groupeEventGenre: string;
	//
	constructor(oMap?: any) {
		super(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.groupeeventid !== undefined) {
                this.groupeeventid = oMap.groupeeventid;
            }
            if (oMap.etudiantaffectationid !== undefined) {
                this.etudiantaffectationid = oMap.etudiantaffectationid;
            }
            if (oMap.note !== undefined) {
                this.note = oMap.note;
            }
			if (oMap.groupeEventName !== undefined) {
                this.groupeEventName = oMap.groupeEventName;
            }
			if (oMap.groupeEventGenre !== undefined) {
                this.groupeEventGenre = oMap.groupeEventGenre;
            }
			if (oMap.etudiantid !== undefined) {
                this.etudiantid = oMap.etudiantid;
            }

        } // oMap
	}
	public get etudiantid(): string {
		return (this._etudiantid !== undefined) ? this._etudiantid : null;
	}
	public set etudiantid(s: string) {
		this._etudiantid = this.check_string(s);
	}
	public get groupeEventName(): string {
		return (this._groupeEventName !== undefined) ? this._groupeEventName : null;
	}
	public set groupeEventName(s: string) {
		this._groupeEventName = this.format_name(s);
	}
	public get groupeEventGenre(): string {
		return (this._groupeEventGenre !== undefined) ? this._groupeEventGenre : null;
	}
	public set groupeEventGenre(s: string) {
		this._groupeEventGenre = this.format_name(s);
	}
	public get etudiantaffectationid(): string {
		return (this._etudiantaffectationid !== undefined) ? this._etudiantaffectationid : null;
	}
	public set etudiantaffectationid(s: string) {
		this._etudiantaffectationid = this.check_string(s);
	}
	public get groupeeventid(): string {
		return (this._groupeeventid !== undefined) ? this._groupeeventid : null;
	}
	public set groupeeventid(s: string) {
		this._groupeeventid = this.check_string(s);
	}
	public to_map(oMap: any): void {
        super.to_map(oMap);
		if (this.note !== null) {
			oMap.note = this.note;
		}
		if (this.groupeeventid !== null) {
			oMap.groupeeventid = this.groupeeventid
		}
		if (this.etudiantaffectationid !== null) {
			oMap.etudiantaffectationid = this.etudiantaffectationid;
		}
		if (this.etudiantid !== null) {
			oMap.etudiantid = this.etudiantid;
		}
		if (this.groupeEventName !== null) {
			oMap.groupeEventName = this.groupeEventName;
		}
		if (this.groupeEventGenre !== null) {
			oMap.groupeEventGenre = this.groupeEventGenre;
		}
    } // to_map
	//
	public get note(): number {
        return ((this._note !== undefined) && (this._note !== null)) ? this._note : null;
    }
    public set note(s: number) {
        let d = this.check_number(s);
        if (d !== null) {
            this._note = d;
        } else {
            this._note = null;
        }
    }
	public is_storeable(): boolean {
        return super.is_storeable() && (this.groupeeventid !== null) &&
			(this.etudiantaffectationid !== null);
    }
	public start_key(): string {
        let s = this.store_prefix();
        if ((s !== null) && (this.groupeeventid !== null)) {
            s = s + this.groupeeventid;
        }
        return s;
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.etudiantaffectationid !== null)) {
            s = s + this.etudiantaffectationid;
        }
		if ((s !== null) && (this.genre !== null)) {
			s = s + this.genre;
		}
        return s;
    } // create_id
    public type(): string {
        return ETUDEVENT_TYPE;
    }
    public store_prefix(): string {
        return ETUDEVENT_PREFIX;
    }
	public check_person(oPers: IPerson): boolean {
		if ((oPers === undefined) || (oPers === null)) {
            return false;
        }
        let bRet: boolean = super.check_person(oPers);
        let xid: string = this.matiereid;
        if ((xid !== undefined) && (xid !== null)) {
            let oAr: string[] = oPers.matiereids;
            if ((oAr === undefined) || (oAr === null)) {
                oAr = [];
            }
            if (this.add_id_to_array(oAr, xid)) {
                oPers.matiereids = oAr;
                bRet = true;
            }
        }// xid
		xid = this.uniteid;
        if ((xid !== undefined) && (xid !== null)) {
            let oAr: string[] = oPers.uniteids;
            if ((oAr === undefined) || (oAr === null)) {
                oAr = [];
            }
            if (this.add_id_to_array(oAr, xid)) {
                oPers.uniteids = oAr;
                bRet = true;
            }
        }// xid
        return bRet;
    }// check_person
}// class 
