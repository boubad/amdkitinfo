// etudiantaffectation.ts
//
import {IEtudiantAffectation} from 'infodata';
import {Affectation} from './affectation';
import {ETUDAFFECTATION_TYPE, ETUDAFFECTATION_PREFIX} from './infoconstants';
//
export class EtudiantAffectation extends Affectation implements IEtudiantAffectation {
	private _etudiantid: string;
	//
    constructor(oMap?: any) {
        super(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.etudiantid !== undefined) {
				this.etudiantid = oMap.etudiantid;
			}
		}// oMap
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
		if (this.etudiantid !== null) {
			oMap.etudiantid = this.etudiantid;
		}
    }// toMap
	public get etudiantid(): string {
		return (this._etudiantid !== undefined) ? this._etudiantid : null;
	}
	public set etudiantid(s: string) {
		this._etudiantid = this.check_string(s);
	}
	public is_storeable(): boolean {
		return (this.etudiantid !== null) && super.is_storeable();
	}
    public type(): string {
        return ETUDAFFECTATION_TYPE;
    }
    public store_prefix(): string {
        return ETUDAFFECTATION_PREFIX;
    }
    public create_id(): string {
        let s1: string = this.start_key();
		let s2: string = this.groupeid;
        let s3: string = this.personid;
		let s4: string = this.create_date_key(this.startDate);
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
}// class EtudiantAffectation