//aaffectation.ts
import {IAffectation,IPerson} from 'infodata';
import {PersonItem} from './personitem';
//
export class Affectation extends PersonItem implements IAffectation {
	private _anneeid: string;
	private _semestreid: string;
	private _groupeid: string;
	private _start: Date;
	private _end: Date;
	private _groupeName: string;
	private _semestreName: string;
	private _anneeName: string;
	private _semestreMinDate:Date;
	private _semestreMaxDate:Date;
	//
	constructor(oMap?: any) {
		super(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.anneeid !== undefined) {
				this.anneeid = oMap.anneeid;
			}
			if (oMap.semestreid !== undefined) {
				this.semestreid = oMap.semestreid;
			}
			if (oMap.groupeid !== undefined) {
				this.groupeid = oMap.groupeid;
			}
			if (oMap.startDate !== undefined) {
				this.startDate = oMap.startDate;
			}
            if (oMap.endDate !== undefined) {
                this.endDate = oMap.endDate;
            }
			if (oMap.groupeName !== undefined) {
				this.groupeName = oMap.groupeName;
			}
			if (oMap.semestreName !== undefined) {
				this.semestreName = oMap.semestreName;
			}
			if (oMap.anneeName !== undefined) {
				this.anneeName = oMap.anneeName;
			}
			if (oMap.semestreMinDate !== undefined){
				this.semestreMinDate = oMap.semestreMinDate;
			}
			if (oMap.semestreMaxDate !== undefined){
				this.semestreMaxDate = oMap.semestreMaxDate;
			}
        } // oMap
	}
	
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
			if (this.anneeid !== null) {
				oMap.anneeid = this.anneeid;
			}
            if (this.semestreid !== null) {
				oMap.semestreid = this.semestreid;
			}
			if (this.groupeid !== null) {
				oMap.groupeid = this.groupeid;
			}
			if (this.startDate !== null) {
                oMap.startDate = this.startDate;
            }
            if (this.endDate !== null) {
                oMap.endDate = this.endDate;
            }
			if (this.groupeName !== null) {
				oMap.groupeName = this.groupeName;
			}
			if (this.semestreName !== null) {
				oMap.semestreName = this.semestreName;
			}
			if (this.anneeName !== null) {
				oMap.anneeName = this.anneeName;
			}
			if (this.semestreMinDate !== null) {
				oMap.semestreMinDate = this.semestreMinDate;
			}
			if (this.semestreMaxDate !== null) {
				oMap.semestreMaxDate = this.semestreMaxDate;
			}
        }
    }// toMap
	public get semestreMinDate():Date {
		return (this._semestreMinDate !== undefined) ? this._semestreMinDate : null;
	}
	public set semestreMinDate(s:Date) {
		this._semestreMinDate = this.check_date(s);
	}
	public get semestreMaxDate():Date {
		return (this._semestreMaxDate !== undefined) ? this._semestreMaxDate : null;
	}
	public set semestreMaxDate(s:Date) {
		this._semestreMaxDate = this.check_date(s);
	}
	public get groupeName(): string {
		return (this._groupeName !== undefined) ? this._groupeName : null;
	}
	public set groupeName(s: string) {
		this._groupeName = this.format_name(s);
	}
	public get semestreName(): string {
		return (this._semestreName !== undefined) ? this._semestreName : null;
	}
	public set semestreName(s: string) {
		this._semestreName = this.format_name(s);
	}
	public get anneeName(): string {
		return (this._anneeName !== undefined) ? this._anneeName : null;
	}
	public set anneeName(s: string) {
		this._anneeName = this.format_name(s);
	}
	public get groupeid(): string {
		return (this._groupeid !== undefined) ? this._groupeid : null;
	}
	public set groupeid(s: string) {
		this._groupeid = this.check_string(s);
	}
	public get semestreid(): string {
		return (this._semestreid !== undefined) ? this._semestreid : null;
	}
	public set semestreid(s: string) {
		this._semestreid = this.check_string(s);
	}
	public get anneeid(): string {
		return (this._anneeid !== undefined) ? this._anneeid : null;
	}
	public set anneeid(s: string) {
		this._anneeid = this.check_string(s);
	}
	public get startDate(): Date {
        return this._start;
    }
    public set startDate(d: Date) {
        this._start = this.check_date(d);
    }
    public get endDate(): Date {
        return this._end;
    }
    public set endDate(d: Date) {
        this._end = this.check_date(d);
    }
	public start_key(): string {
        let s1: string = this.store_prefix();
        let s2: string = this.semestreid;
        if (s1 == null) {
            s1 = "";
        }
        if ((s2 === undefined) || (s2 === null)) {
            s2 = "";
        }
        return (s1 + s2);
    }
	public is_storeable(): boolean {
        if ((!super.is_storeable()) || (this.semestreid === null)
            || (this.groupeid === null)) {
            return false;
        }
		if ((this.startDate === null) || (this.endDate == null)) {
			return false;
		}
        var t1 = Date.parse(this.startDate.toString());
        var t2 = Date.parse(this.endDate.toString());
        if (isNaN(t1) || isNaN(t2)) {
            return false;
        }
        return (t1 <= t2);
    }
	public check_person(oPers:IPerson): boolean {
		if ((oPers === undefined) || (oPers === null)) {
            return false;
        }
        let bRet: boolean = super.check_person(oPers);
        let xid: string = this.anneeid;
        if ((xid !== undefined) && (xid !== null)) {
            let oAr: string[] = oPers.anneeids;
            if ((oAr === undefined) || (oAr === null)) {
                oAr = [];
            }
            if (this.add_id_to_array(oAr, xid)) {
                oPers.anneeids = oAr;
                bRet = true;
            }
        }// xid
        xid = this.semestreid;
        if ((xid !== undefined) && (xid !== null)) {
            let oAr: string[] = oPers.semestreids;
            if ((oAr === undefined) || (oAr === null)) {
                oAr = [];
            }
            if (this.add_id_to_array(oAr, xid)) {
                oPers.semestreids = oAr;
                bRet = true;
            }
        }// xid
		xid = this.groupeid;
        if ((xid !== undefined) && (xid !== null)) {
            let oAr: string[] = oPers.groupeids;
            if ((oAr === undefined) || (oAr === null)) {
                oAr = [];
            }
            if (this.add_id_to_array(oAr, xid)) {
                oPers.groupeids = oAr;
                bRet = true;
            }
        }// xid
		xid = this.id;
        if ((xid !== undefined) && (xid !== null)) {
            let oAr: string[] = oPers.affectationids;
            if ((oAr === undefined) || (oAr === null)) {
                oAr = [];
            }
            if (this.add_id_to_array(oAr, xid)) {
                oPers.affectationids = oAr;
                bRet = true;
            }
        }// xid
        return bRet;
    }// check_person
	public toString(): string {
		let s: string = super.toString();
		if ((s !== null) && (this.groupeName != null)) {
			s = s + ' ' + this.groupeName;
		}
		return s;
	}
}// class Affectation
//
