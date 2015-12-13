//enseignantaffectation.ts
import {IEnseignantAffectation, IPerson} from 'infodata';
import {Affectation} from './affectation';
import {PROFAFFECTATION_TYPE, PROFAFFECTATION_PREFIX} from './infoconstants';
//
export class EnseignantAffectation extends Affectation implements IEnseignantAffectation {
	private _enseignantid: string;
	private _uniteid: string;
	private _matiereid: string;
	private _matiereName: string;
	private _uniteName: string;
	//
    constructor(oMap?: any) {
        super(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.enseignantid !== undefined) {
				this.enseignantid = oMap.enseignantid;
			}
			if (oMap.uniteid !== undefined) {
				this.uniteid = oMap.uniteid;
			}
			if (oMap.matiereid !== undefined) {
				this.matiereid = oMap.matiereid;
			}
			if (oMap.matiereName !== undefined) {
				this.matiereName = oMap.matiereName;
			}
			if (oMap.uniteName !== undefined) {
				this.uniteName = oMap.uniteName;
			}
		}// oMap
    }

    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
			if (this.enseignantid !== null) {
				oMap.enseignantid = this.enseignantid;
			}
			if (this.uniteid !== null) {
				oMap.uniteid = this.uniteid;
			}
			if (this.matiereid !== null) {
				oMap.matiereid = this.matiereid;
			}
			if (this.matiereName !== null) {
				oMap.matiereName = this.matiereName;
			}
			if (this.uniteName !== null) {
				oMap.uniteName = this.uniteName;
			}
        }
    }// toMap
	public get uniteid(): string {
		return (this._uniteid !== undefined) ? this._uniteid : null;
	}
	public set uniteid(s: string) {
		this._uniteid = this.check_string(s);
	}
	public get enseignantid(): string {
		return (this._enseignantid !== undefined) ? this._enseignantid : null;
	}
	public set enseignantid(s: string) {
		this._enseignantid = this.check_string(s);
	}
	public get matiereid(): string {
		return (this._matiereid !== undefined) ? this._matiereid : null;
	}
	public set matiereid(s: string) {
		this._matiereid = this.check_string(s);
	}
	public get matiereName(): string {
		return (this._matiereName !== undefined) ? this._matiereName : null;
	}
	public set matiereName(s: string) {
		this._matiereName = this.check_string(s);
	}
	public get uniteName(): string {
		return (this._uniteName !== undefined) ? this._uniteName : null;
	}
	public set uniteName(s: string) {
		this._uniteName = this.check_string(s);
	}
	public is_storeable(): boolean {
		return (this.enseignantid !== null) &&
			(this.matiereid !== null) && super.is_storeable();
	}
    public type(): string {
        return PROFAFFECTATION_TYPE;
    }
    public store_prefix(): string {
        return PROFAFFECTATION_PREFIX;
    }
    public create_id(): string {
        let s1: string = this.start_key();
		let s3: string = this.groupeid;
		let s2: string = this.matiereid;
        let s4: string = this.personid;
        if (s1 == null) {
            s1 = "";
        }
        if (s2 == null) {
            s2 = "";
        }
		if (s3 == null) {
			s3 = "";
		}
		if (s4 == null) {
			s4 = "";
		}
        return (s1 + s2 + s3 + s4);
    }
	public check_person(oPers: IPerson): boolean {
		if ((oPers === undefined) || (oPers === null)) {
            return false;
        }
        let bRet: boolean = super.check_person(oPers);
        let xid: string = this.uniteid;
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
        xid = this.matiereid;
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
        return bRet;
    }// check_person
}// class EtudiantAffectation
//
