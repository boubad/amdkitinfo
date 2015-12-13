//groupeevent.ts
import {IGroupeEvent} from 'infodata';
import {InfoEvent} from './infoevent';
import {GROUPEEVENT_TYPE, GROUPEEVENT_PREFIX} from './infoconstants';
//
//
export class GroupeEvent extends InfoEvent implements IGroupeEvent {
	private _profaffectationid: string;
    private _name: string;
    private _location: string;
    private _startTime: string;
    private _endTime: string;
	private _minnote: number;
	private _maxnote: number;
	//
	constructor(oMap?: any) {
		super(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.profaffectationid !== undefined) {
                this.profaffectationid = oMap.profaffectationid;
            }
            if (oMap.name !== undefined) {
                this.name = oMap.name;
            }
            if (oMap.location !== undefined) {
                this.location = oMap.location;
            }
            if (oMap.startTime !== undefined) {
                this.startTime = oMap.startTime;
            }
            if (oMap.endTime !== undefined) {
                this.endTime = oMap.endTime;
            }
			if (oMap.minnote !== undefined) {
                this.minnote = oMap.minnote;
            }
			if (oMap.maxnote !== undefined) {
                this.maxnote = oMap.maxnote;
            }
        } // oMap
	}
	public get endTime(): string {
		return (this._endTime !== undefined) ? this._endTime : null;
	}
	public set endTime(s: string) {
		this._endTime = this.check_string(s);
	}
	public get startTime(): string {
		return (this._startTime !== undefined) ? this._startTime : null;
	}
	public set startTime(s: string) {
		this._startTime = this.check_string(s);
	}
	public get name(): string {
		return (this._name !== undefined) ? this._name : null;
	}
	public set name(s: string) {
		this._name = this.format_name(s);
	}
	public get location(): string {
		return (this._location !== undefined) ? this._location : null;
	}
	public set location(s: string) {
		this._profaffectationid = this.check_string(s);
	}
	public get profaffectationid(): string {
		return (this._profaffectationid !== undefined) ? this._profaffectationid : null;
	}
	public set profaffectationid(s: string) {
		this._profaffectationid = this.check_string(s);
	}
	public to_map(oMap: any): void {
        super.to_map(oMap);
		if (this.minnote !== null) {
			oMap.minnote = this.minnote;
		}
		if (this.maxnote !== null) {
			oMap.maxnote = this.maxnote;
		}
		if (this.profaffectationid !== null) {
			oMap.profaffectationid = this.profaffectationid;
		}
		if (this.name !== null) {
			oMap.name = this.name;
		}
		if (this.location !== null) {
			oMap.location = this.location;
		}
		if (this.startTime !== null) {
			oMap.startTime = this.startTime;
		}
		if (this.endTime !== null) {
			oMap.endTime = this.endTime;
		}
		if (this.minnote !== null) {
			oMap.minnote = this.minnote;
		}
		if (this.maxnote !== null) {
			oMap.maxnote = this.maxnote;
		}
    } // to_map
	//
	public get minnote(): number {
        return ((this._minnote !== undefined) && (this._minnote !== null)) ? this._minnote : 0.0;
    }
    public set minnote(s: number) {
        let d = this.check_number(s);
        if (d !== null) {
            this._minnote = d;
        } else {
            this._minnote = null;
        }
    }
	public get maxnote(): number {
        return ((this._maxnote !== undefined) && (this._maxnote !== null)) ? this._maxnote : 0.0;
    }
    public set maxnote(s: number) {
        let d = this.check_number(s);
        if (d !== null) {
            this._maxnote = d;
        } else {
            this._maxnote = null;
        }
    }
	public is_storeable(): boolean {
        let bRet = super.is_storeable() && (this.profaffectationid !== null) &&
			(this.eventDate !== null) && (this.name !== null);
        if (!bRet) {
            return false;
        }
		return true;
    }
    public toString(): string {
        return this.name;
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.profaffectationid !== null)) {
            s = s + this.profaffectationid;
        }
        if ((s !== null) && (this.genre !== null)) {
            s = s + this.genre.trim().toUpperCase();
        }
        if ((s !== null) && (this.eventDate !== null)) {
            s = s + this.eventDate.toISOString().substr(0, 10);
        }
        return s;
    } // create_id
    public type(): string {
        return GROUPEEVENT_TYPE;
    }
    public store_prefix(): string {
        return GROUPEEVENT_PREFIX;
    }
}// class GroupeEvent
//