//enseignant.ts
import {IEnseignant} from 'infodata';
import {DepartementPerson} from './departementperson';
import {Person} from './person';
import {ENSEIGNANT_TYPE, ENSEIGNANT_PREFIX} from './infoconstants';
//
//
export class Enseignant extends DepartementPerson implements IEnseignant {
    constructor(oMap?: any) {
        super(oMap);
    }
    public type(): string {
        return ENSEIGNANT_TYPE;
    }
    public store_prefix(): string {
        return ENSEIGNANT_PREFIX;
    }
    public check_person(oPers: Person): boolean {
		 if ((oPers === undefined) || (oPers === null)) {
            return false;
        }
        let bRet: boolean = super.check_person(oPers);
        let xid: string = this.id;
        if ((xid !== undefined) && (xid !== null)) {
            let oAr: string[] = oPers.enseignantids;
            if ((oAr === undefined) || (oAr === null)) {
                oAr = [];
            }
            if (this.add_id_to_array(oAr, xid)) {
                oPers.enseignantids = oAr;
                bRet = true;
            }
        }// xid
        return bRet;
    }// check_person
}// class Enseignant
//