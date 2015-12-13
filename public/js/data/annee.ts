//annee.ts
import {IAnnee} from 'infodata';
import {IntervalledSigleItem} from './intervalledsigleitem';
import {ANNEE_TYPE, ANNEE_PREFIX} from './infoconstants';
//
export class Annee extends IntervalledSigleItem implements IAnnee {
	private _departementid: string;
	//
	constructor(oMap?: any) {
		super(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.departementid !== undefined) {
				this.departementid = oMap.departementid;
			}
		}// oMap
	}
	//
	public get departementid(): string {
		return (this._departementid !== undefined) ? this._departementid : null;
	}
	public set departementid(s: string) {
		this._departementid = this.check_string(s);
	}
	public to_map(oMap: any): void {
		super.to_map(oMap);
		if (this.departementid !== null) {
			oMap.departementid = this.departementid;
		}
    }// toMap
		
	public is_storeable(): boolean {
		return (this.departementid !== null) &&
			(this.departementid.length > 0) && super.is_storeable();
    }
	public start_key(): string {
		let s1: string = this.store_prefix();
		let s2: string = this.departementid;
		if ((s1 === undefined) || (s1 == null)) {
            s1 = "";
        }
        if ((s2 === undefined) || (s2 === null)) {
            s2 = "";
        }
        return (s1 + s2);
    }
	public type(): string {
        return ANNEE_TYPE;
    }
    public store_prefix(): string {
        return ANNEE_PREFIX;
    }
}// class Annee
