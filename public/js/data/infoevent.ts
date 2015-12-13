//infoevent.ts
import {IInfoEvent, IPerson} from 'infodata';
import {PersonItem} from './personitem';
//
export class InfoEvent extends PersonItem implements IInfoEvent {
	private _semestreid: string;
	private _matiereid: string;
	private _groupeid: string;
	private _genre: string;
	private _matiereName: string;
	private _groupeName: string;
	private _date: Date = null;
	private _coef: number;
	private _semestreName: string;
	private _anneeid: string;
	private _anneeName: string;
	private _matiereCoefficient;
	private _uniteid: string;
	private _uniteCoefficient: number;
	private _uniteName: string;
	private _semestreMinDate: Date;
	private _semestreMaxDate: Date;
	//
	constructor(oMap?: any) {
		super(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.semestreid !== undefined) {
                this.semestreid = oMap.semestreid;
            }
			if (oMap.matiereid !== undefined) {
                this.matiereid = oMap.matiereid;
            }
			if (oMap.groupeid !== undefined) {
                this.groupeid = oMap.groupeid;
            }
			if (oMap.genre !== undefined) {
				this.genre = oMap.genre;
			}
			if (oMap.matiereName !== undefined) {
                this.matiereName = oMap.matiereName;
            }
			if (oMap.groupeName !== undefined) {
                this.groupeName = oMap.groupeName;
            }
			if (oMap.eventDate !== undefined) {
				this.eventDate = oMap.eventDate;
			}
			if (oMap.coefficient !== undefined) {
                this.coefficient = oMap.coefficient;
            }
			if (oMap.semestreName !== undefined) {
                this.semestreName = oMap.semestreName;
            }
			if (oMap.anneeid !== undefined) {
                this.anneeid = oMap.anneeid;
            }
			if (oMap.anneeName !== undefined) {
                this.anneeName = oMap.anneeName;
            }
			if (oMap.matiereCoefficient !== undefined) {
				this.matiereCoefficient = oMap.matiereCoefficient;
			}
			if (oMap.uniteid !== undefined) {
				this.uniteid = oMap.uniteid;
			}
			if (oMap.uniteCoefficient !== undefined) {
				this.uniteCoefficient = oMap.uniteCoefficient;
			}
			if (oMap.uniteName !== undefined) {
				this.uniteName = oMap.uniteName;
			}
			if (oMap.semestreMinDate !== undefined) {
				this.semestreMinDate = oMap.semestreMinDate;
			}
			if (oMap.semestreMaxDate !== undefined) {
				this.semestreMaxDate = oMap.semestreMaxDate;
			}
		} // oMap
	}
	public get semestreMaxDate(): Date {
		return (this._semestreMaxDate !== undefined) ? this._semestreMaxDate : null;
	}
	public set semestreMaxDate(s: Date) {
		this._semestreMaxDate = this.check_date(s);
	}
	public get semestreMinDate(): Date {
		return (this._semestreMinDate !== undefined) ? this._semestreMinDate : null;
	}
	public set semestreMinDate(s: Date) {
		this._semestreMinDate = this.check_date(s);
	}
	public get uniteName(): string {
		return (this._uniteName !== undefined) ? this._uniteName : null;
	}
	public set uniteName(s: string) {
		this._uniteName = this.check_string(s);
	}
	public get uniteid(): string {
		return (this._uniteid !== undefined) ? this._uniteid : null;
	}
	public set uniteid(s: string) {
		this._uniteid = this.check_string(s);
	}
	public get uniteCoefficient(): number {
		return ((this._uniteCoefficient !== undefined) &&
			(this._uniteCoefficient !== null) && (this._uniteCoefficient > 0.0)) ?
			this._uniteCoefficient : 1.0;
	}
	public set uniteCoefficient(s: number) {
		this._uniteCoefficient = this.check_number(s);
	}
	public get matiereCoefficient(): number {
		return ((this._matiereCoefficient !== undefined) &&
			(this._matiereCoefficient !== null) && (this._matiereCoefficient > 0.0)) ?
			this._matiereCoefficient : 1.0;
	}
	public set matiereCoefficient(s: number) {
		this._matiereCoefficient = this.check_number(s);
	}
	public get anneeName(): string {
		return (this._anneeName !== undefined) ? this._anneeName : null;
	}
	public set anneeName(s: string) {
		this._anneeName = this.check_string(s);
	}
	public get anneeid(): string {
		return (this._anneeid !== undefined) ? this._anneeid : null;
	}
	public set anneeid(s: string) {
		this._anneeid = this.check_string(s);
	}
	public get semestreName(): string {
		return (this._semestreName !== undefined) ? this._semestreName : null;
	}
	public set semestreName(s: string) {
		this._semestreName = this.check_string(s);
	}
	public get groupeName(): string {
		return (this._groupeName !== undefined) ? this._groupeName : null;
	}
	public set groupeName(s: string) {
		this._groupeName = this.check_string(s);
	}
	public get matiereName(): string {
		return (this._matiereName !== undefined) ? this._matiereName : null;
	}
	public set matiereName(s: string) {
		this._matiereName = this.check_string(s);
	}
	public get genre(): string {
		return (this._genre !== undefined) ? this._genre : null;
	}
	public set genre(s: string) {
		this._genre = this.check_upper_string(s);
	}
	public get groupeid(): string {
		return (this._groupeid !== undefined) ? this._groupeid : null;
	}
	public set groupeid(s: string) {
		this._groupeid = this.check_string(s);
	}
	public get matiereid(): string {
		return (this._matiereid !== undefined) ? this._matiereid : null;
	}
	public set matiereid(s: string) {
		this._matiereid = this.check_string(s);
	}
	public get semestreid(): string {
		return (this._semestreid !== undefined) ? this._semestreid : null;
	}
	public set semestreid(s: string) {
		this._semestreid = this.check_string(s);
	}
	public get eventDate(): Date {
        return (this._date !== undefined) ? this._date : null;
    }
    public set eventDate(d: Date) {
        this._date = this.check_date(d);
    }
	public get coefficient(): number {
        return ((this._coef !== undefined) && (this._coef !== null) && (this._coef > 0)) ? this._coef : 1.0;
    }
	public get dateString(): string {
		return this.date_to_string(this.eventDate);
	}
    public set coefficient(s: number) {
        let d = this.check_number(s);
        if ((d !== null) && (d > 0)) {
            this._coef = d;
        } else {
            this._coef = null;
        }
    }
	public to_map(oMap: any): void {
        super.to_map(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if (this.semestreid !== null) {
				oMap.semestreid = this.semestreid;
			}
			if (this.matiereid !== null) {
				oMap.matiereid = this.matiereid;
			}
			if (this.groupeid !== null) {
				oMap.groupeid = this.groupeid;
			}
			if (this.matiereName !== null) {
				oMap.matiereName = this.matiereName;
			}
			if (this.groupeName !== null) {
				oMap.groupeName = this.groupeName;
			}
			if (this.coefficient !== null) {
				oMap.coefficient = this.coefficient;
			}
			if (this.anneeid !== null) {
				oMap.anneeid = this.anneeid;
			}
			if (this.anneeName !== null) {
				oMap.anneeName = this.anneeName;
			}
			if (this.semestreName !== null) {
				oMap.semestreName = this.semestreName;
			}
			if (this.matiereCoefficient !== null) {
				oMap.matiereCoefficient = this.matiereCoefficient;
			}
			if (this.uniteid !== null) {
				oMap.uniteid = this.uniteid;
			}
			if (this.uniteCoefficient !== null) {
				oMap.uniteCoefficient = this.uniteCoefficient;
			}
			if (this.uniteName !== null) {
				oMap.uniteName = this.uniteName;
			}
			if (this.eventDate !== null) {
				oMap.eventDate = this.eventDate;
			}
			if (this.genre !== null) {
				oMap.genre = this.genre;
			}
			if (this.semestreMinDate !== null) {
				oMap.semestreMinDate = this.semestreMinDate;
			}
			if (this.semestreMaxDate !== null) {
				oMap.semestreMaxDate = this.semestreMaxDate;
			}
		}// oMap
    } // to_map
	//
	public is_storeable(): boolean {
        let bRet = super.is_storeable() && (this.semestreid !== null) && (this.matiereid !== null) &&
            (this.genre !== null);
        return bRet;
    }
	public start_key(): string {
        let s = this.store_prefix();
        if ((s !== null) && (this.semestreid !== null)) {
            s = s + this.semestreid;
        }
        if ((s !== null) && (this.matiereid !== null)) {
            s = s + this.matiereid;
        }
		if ((s !== null) && (this.groupeid !== null)) {
            s = s + this.groupeid;
        }
        return s;
    }
	public check_person(oPers: IPerson): boolean {
		if ((oPers === undefined) || (oPers === null)) {
            return false;
        }
        let bRet: boolean = super.check_person(oPers);
        let xid: string = this.id;
        if ((xid !== undefined) && (xid !== null)) {
            let oAr: string[] = oPers.eventids;
            if ((oAr === undefined) || (oAr === null)) {
                oAr = [];
            }
            if (this.add_id_to_array(oAr, xid)) {
                oPers.eventids = oAr;
                bRet = true;
            }
        }// xid
        return bRet;
    }// check_person
	public sort_func(p1: IInfoEvent, p2: IInfoEvent): number {
        let d1 = p1.eventDate;
        let d2 = p2.eventDate;
        if ((d1 !== null) && (d2 !== null)) {
            let t1 = Date.parse(d1.toString());
            let t2 = Date.parse(d2.toString());
            if (t1 > t2) {
                return -1;
            } else if (t1 < t2) {
                return 1;
            } else {
                let s1: string = (p1.fullname !== null) ? p1.fullname : "";
				let s2: string = (p2.fullname !== null) ? p2.fullname : "";
				return s1.localeCompare(s2);
            }
        } else if ((d1 === null) && (d2 !== null)) {
            return 1;
        } else if ((d1 !== null) && (d2 === null)) {
            return -1;
        } else {
            let s1: string = (p1.fullname !== null) ? p1.fullname : "";
			let s2: string = (p2.fullname !== null) ? p2.fullname : "";
			return s1.localeCompare(s2);
        }
    } // sort_func
}// class InfoEvent
//
