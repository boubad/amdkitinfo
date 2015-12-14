// displayetudiant.ts
//
import {IDisplayEtudiant, IEtudiantEvent} from 'infodata';
import {BaseItem} from './baseitem';
import {EVT_NOTE, EVT_ABSENCE, EVT_MISC, EVT_RETARD} from './infoconstants';
//
export class DisplayEtudiant extends BaseItem implements IDisplayEtudiant {
    //
    private _personid: string;
    private _etudiantid: string;
    private _uniteid: string;
    private _matiereid: string;
    private _groupeid: string;
    private _firstname: string;
    private _lastname: string;
    private _coefficient: number;
    private _note: number;
    private _groupeName: string;
    private _matiereName: string;
    private _uniteName: string;
    private _matiereCoefficient: number;
    private _uniteCoefficient: number;
    private _order: number;
    //
    private _absencesCount: number;
    private _retardsCount: number;
    private _miscCount: number;
    //
    private _count: number;
    private _sumcoefs: number;
    private _sumdata: number;
	private _descriptions: string[];
    //
    constructor(oMap?: any) {
        super(oMap);
    }
    public avatardocid(): string {
        return this.personid;
    }
    public get id(): string {
        return this.etudiantid;
    }
    public fillEvent(p: IEtudiantEvent): void {
        if (this.personid == null) {
			this.etudiantid = p.etudiantid;
            this.personid = p.personid;
            this.firstname = p.firstname;
            this.lastname = p.lastname;
            this.avatarid = p.avatarid;
			this.groupeid = p.groupeName;
			this.matiereName = p.matiereName;
			this.groupeName = p.groupeName;
            this.coefficient = null;
            this.note = null;
            this.absencesCount = 0;
            this.retardsCount = 0;
            this.miscCount = 0;
            this._count = 0;
            this._sumdata = 0;
            this._sumcoefs = 0;
        }
    }// fillEvent
	public fillDisplayEtudiant(p: IDisplayEtudiant): void {
        if (this.personid == null) {
            this.personid = p.personid;
            this.etudiantid = p.etudiantid;
            this.uniteid = p.uniteid;
            this.matiereid = p.matiereid;
            this.groupeid = p.groupeid;
            this.firstname = p.firstname;
            this.lastname = p.lastname;
            this.avatarid = p.avatarid;
            this.groupeName = p.groupeName;
            this.matiereName = p.matiereName;
            this.uniteName = p.uniteName;
            this.matiereCoefficient = p.matiereCoefficient;
            this.uniteCoefficient = p.uniteCoefficient;
            this.order = p.order;
            this.coefficient = null;
            this.note = null;
            this.absencesCount = 0;
            this.retardsCount = 0;
            this.miscCount = 0;
            this._count = 0;
            this._sumdata = 0;
            this._sumcoefs = 0;
        }
    }// fillEvent
	public get uniteCoefficient(): number {
		return ((this._uniteCoefficient !== undefined) && (this._uniteCoefficient !== null) &&
			(this._uniteCoefficient > 0.0)) ? this._uniteCoefficient : 1.0;
	}
	public set uniteCoefficient(s: number) {
		this._uniteCoefficient = this.check_number(s);
	}
	public get matiereCoefficient(): number {
		return ((this._matiereCoefficient !== undefined) && (this._matiereCoefficient !== null) &&
			(this._matiereCoefficient > 0.0)) ? this._matiereCoefficient : 1.0;
	}
	public set matiereCoefficient(s: number) {
		this._matiereCoefficient = this.check_number(s);
	}
	public get order(): number {
		return ((this._order !== undefined) && (this._order !== null)) ? this._order : null;
	}
	public set order(s: number) {
		this._order = this.check_number(s);
	}
	public get uniteName(): string {
		return (this._uniteName !== undefined) ? this._uniteName : null;
	}
	public set uniteName(s: string) {
		this._uniteName = this.check_string(s);
	}
	public get matiereid(): string {
		return (this._matiereid !== undefined) ? this._matiereid : null;
	}
	public set matiereid(s: string) {
		this._matiereid = this.check_string(s);
	}
	public get uniteid(): string {
		return (this._uniteid !== undefined) ? this._uniteid : null;
	}
	public set uniteid(s: string) {
		this._uniteid = this.check_string(s);
	}
	public get miscCount(): number {
		return ((this._miscCount !== undefined) && (this._miscCount !== null)
			&& (this._miscCount > 0)) ? this._miscCount : null;
	}
	public set miscCount(s: number) {
		this._miscCount = this.check_number(s);
	}
	public get retardsCount(): number {
		return ((this._retardsCount !== undefined) && (this._retardsCount !== null)
			&& (this._retardsCount > 0)) ? this._retardsCount : null;
	}
	public set retardsCount(s: number) {
		this._retardsCount = this.check_number(s);
	}
	public get absencesCount(): number {
		return ((this._absencesCount !== undefined) && (this._absencesCount !== null)
			&& (this._absencesCount > 0)) ? this._absencesCount : null;
	}
	public set absencesCount(s: number) {
		this._absencesCount = this.check_number(s);
	}
	public get note(): number {
		return ((this._note !== undefined) && (this._note !== null)) ? this._note : null;
	}
	public set note(s: number) {
		this._note = this.check_number(s);
	}
	public get coefficient(): number {
		return ((this._coefficient !== undefined) && (this._coefficient !== null) &&
			(this._coefficient > 0.0)) ? this._coefficient : 1.0;
	}
	public set coefficient(s: number) {
		this._coefficient = this.check_number(s);
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
	public get lastname(): string {
		return (this._lastname !== undefined) ? this._lastname : null;
	}
	public set lastname(s: string) {
		this._lastname = this.check_upper_string(s);
	}
	public get firstname(): string {
		return (this._firstname !== undefined) ? this._firstname : null;
	}
	public set firstname(s: string) {
		this._firstname = this.format_name(s);
	}
	public get groupeid(): string {
		return (this._groupeid !== undefined) ? this._groupeid : null;
	}
	public set groupeid(s: string) {
		this._groupeid = this.check_string(s);
	}
	public get etudiantid(): string {
		return (this._etudiantid !== undefined) ? this._etudiantid : null;
	}
	public set etudiantid(s: string) {
		this._etudiantid = this.check_string(s);
		this.id = this._etudiantid;
	}
	public get personid(): string {
		return (this._personid !== undefined) ? this._personid : null;
	}
	public set personid(s: string) {
		this._personid = this.check_string(s);
	}

    public get sortCriteria(): number {
        return ((1000.0 * this.miscCount) + (100.0 * this.absencesCount) +
            (10.0 * this.retardsCount));
    }
	public get descriptions():string[] {
		return ((this._descriptions !== undefined) && (this._descriptions !== null)) ?
		this._descriptions : [];
	}
	public get has_descriptions():boolean {
		return (this.descriptions.length > 0);
	}
    public get absenceString(): string {
        return (this.absencesCount > 0) ? "" + this.absencesCount : "";
    }
    public get retardString(): string {
        return (this.retardsCount > 0) ? "" + this.retardsCount : "";
    }
    public get miscString(): string {
        return (this.miscCount > 0) ? "" + this.miscCount : "";
    }
    public get notesCount(): number {
        return this._count;
    }
    public get coefficientString(): string {
        return this.number_to_string(this.coefficient);
    }
    public get noteString(): string {
        return this.number_to_string(this.note);
    }
	private check_desc(p: IEtudiantEvent): void {
		let s = p.description;
		if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
			let sx:string = this.date_to_string(p.eventDate) + ": " + s;
			if ((this._descriptions === undefined) || (this._descriptions === null)) {
				this._descriptions = [sx];
			} else {
				this._descriptions.push(sx);
			}
		}
	}
    public add_event(p: IEtudiantEvent): void {
        if ((p !== undefined) && (p !== null) && (p.genre !== undefined) && (p.genre !== null)) {
            let s: string = ((p.description !== undefined) && (p.description !== null) &&
                (p.description.trim().length > 0)) ? p.description.trim() : null;
            if (s !== null) {
                let old = ((this.description !== undefined) && (this.description !== null) &&
                    (this.description.trim().length > 0)) ? this.description.trim().length : null;
                if (old !== null) {
                    s = old + "\r\n" + s;
                }
                this.description = s;
            }
            if (p.genre == EVT_NOTE) {
                this.add_note(p.note, p.coefficient);
            } else {
				this.check_desc(p);
                this.add_event_misc(p.genre);
            }
        }
    }
    public add_event_misc(sGenre: string): void {
        if (sGenre.indexOf('ABS') >= 0) {
            this.absencesCount = this.absencesCount + 1;
        } else if (sGenre.indexOf('RET') >= 0) {
            this.retardsCount = this.retardsCount + 1;
        } else {
            this.miscCount = this.miscCount + 1;
        }
    }// sGenre
    public add_note(val: number, coef?: number): void {
        if ((val !== undefined) && (val !== null) && (val >= 0)) {
            if ((this._count === undefined) || (this._count === null)) {
                this._count = 0;
            }
            if ((this._sumdata === undefined) || (this._sumdata === null)) {
                this._sumdata = 0;
            }
            if ((this._sumcoefs === undefined) || (this._sumcoefs === null)) {
                this._sumcoefs = 0;
            }
            let c: number = ((coef !== undefined) && (coef !== null) && (coef > 0)) ? coef : 1.0;
            this._count = this._count + 1;
            this._sumdata = this._sumdata + (val * c);
            this._sumcoefs = this._sumcoefs + c;
            this.note = this.format_note(this._sumdata / this._sumcoefs);
        }// val
    }//add_note
    public get fullname(): string {
        return ((this.lastname !== null) && (this.firstname !== null)) ?
            (this.lastname + ' ' + this.firstname) : null;
    } // fullname
    public sort_func(p1: IDisplayEtudiant, p2: IDisplayEtudiant): number {
        let s1 = p1.fullname;
        let s2 = p2.fullname;
        if ((s1 !== null) && (s2 !== null)) {
            return s1.localeCompare(s2);
        } else if ((s1 === null) && (s2 !== null)) {
            return 1;
        } else if ((s1 !== null) && (s2 === null)) {
            return -1;
        } else {
            return 0;
        }
    } // sort_func
    public static evt_sort_func(p1: IDisplayEtudiant, p2: IDisplayEtudiant): number {
        let nRet: number = 0;
        if (p1.sortCriteria > p2.sortCriteria) {
            nRet = -1;
        } else if (p1.sortCriteria < p2.sortCriteria) {
            nRet = 1;
        }
        return nRet;
    } // sort_func
    public static evt_sort_matiere_func(p1: IDisplayEtudiant, p2: IDisplayEtudiant): number {
        if (p1.order < p2.order) {
            return -1;
        } else if (p1.order > p2.order) {
            return 1;
        } else {
            return 0;
        }
    } // sort_func
    public static evt_sort_unite_func(p1: IDisplayEtudiant, p2: IDisplayEtudiant): number {
        let s1 = ((p1.uniteName !== undefined) && (p1.uniteName !== null)) ? p1.uniteName.trim().toUpperCase() : '';
        let s2 = ((p2.uniteName !== undefined) && (p2.uniteName !== null)) ? p2.uniteName.trim().toUpperCase() : '';
        return s1.localeCompare(s2);
    } // sort_func
}// class DisplayEtudiant
//
export class DisplayEtudiantsArray {
    private _data: Map<string, DisplayEtudiant> = new Map<string, DisplayEtudiant>();
    //
    public constructor() {
    }
    public add_event(p: IEtudiantEvent): void {
        if ((p !== undefined) && (p !== null) && (p.personid !== null)) {
            let id: string = p.personid;
            if (this._data.has(id)) {
                let v: DisplayEtudiant = this._data.get(id);
                v.add_event(p);
            } else {
                let v: DisplayEtudiant = new DisplayEtudiant();
                v.fillEvent(p);
                v.add_event(p);
                this._data.set(id, v);
            }
        }
    }// add_event
    public get_etudiantdisplays(): IDisplayEtudiant[] {
        let oRet: DisplayEtudiant[] = [];
        this._data.forEach((val, key) => {
            oRet.push(val);
        });
        return oRet;
    }//
    public get_sorted_etudiantdisplays(): IDisplayEtudiant[] {
        let oRet: DisplayEtudiant[] = [];
        this._data.forEach((val, key) => {
            if (val.sortCriteria > 0) {
                oRet.push(val);
            }
        });
        if (oRet.length > 2) {
            let pf = DisplayEtudiant.evt_sort_func;
            if ((pf !== undefined) && (pf !== null)) {
                oRet.sort(pf);
            }
        }
        return oRet;
    }//
}//
//
export class MatiereDisplayEtudiantsArray {
    private _data: Map<string, DisplayEtudiant>;
    constructor() {
		this._data = new Map<string, DisplayEtudiant>();
    }
    public add_event(p: IEtudiantEvent): void {
        if ((p === undefined) || (p === null)) {
            return;
        }
        let matiereid = p.matiereid;
        if ((p.genre !== EVT_NOTE) || (matiereid === undefined) || (matiereid === null)) {
            return;
        }
        if (this._data.has(matiereid)) {
            let v: DisplayEtudiant = this._data.get(matiereid);
            v.add_note(p.note, p.coefficient);
        } else {
            let v: DisplayEtudiant = new DisplayEtudiant();
            v.fillEvent(p);
            v.add_note(p.note, p.coefficient);
            this._data.set(matiereid, v);
        }
    }// add_event
    public get_etudiantdisplays(): IDisplayEtudiant[] {
        let oRet: DisplayEtudiant[] = [];
        this._data.forEach((val, key) => {
            oRet.push(val);
        });
        if (oRet.length > 2) {
            let pf = DisplayEtudiant.evt_sort_matiere_func;
            if ((pf !== undefined) && (pf !== null)) {
                oRet.sort(pf);
            }
        }
        return oRet;
    }//
}
//
export class UniteDisplayEtudiantsArray {
    private _data: Map<string, DisplayEtudiant>;
    constructor() {
		this._data = new Map<string, DisplayEtudiant>();
    }
    public add_event(p: IDisplayEtudiant): void {
        if ((p === undefined) || (p === null)) {
            return;
        }
        let uniteid = p.uniteid;
        if ((uniteid === undefined) || (uniteid === null)) {
            return;
        }
        if (this._data.has(uniteid)) {
            let v: DisplayEtudiant = this._data.get(uniteid);
            v.add_note(p.note, p.matiereCoefficient);
        } else {
            let v: DisplayEtudiant = new DisplayEtudiant();
            v.fillDisplayEtudiant(p);
            v.add_note(p.note, p.matiereCoefficient);
            this._data.set(uniteid, v);
        }
    }// add_event
    public get_etudiantdisplays(): IDisplayEtudiant[] {
        let oRet: DisplayEtudiant[] = [];
        this._data.forEach((val, key) => {
            oRet.push(val);
        });
        if (oRet.length > 2) {
            let pf = DisplayEtudiant.evt_sort_unite_func;
            if ((pf !== undefined) && (pf !== null)) {
                oRet.sort(pf);
            }
        }
        return oRet;
    }//
}// class  MatiereDisplayEtudiantsArray
