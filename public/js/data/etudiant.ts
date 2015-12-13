//etudiant.ts
import {IEtudiant} from 'infodata';
import {DepartementPerson} from './departementperson';
import {Person} from './person';
import {ETUDIANT_TYPE, ETUDIANT_PREFIX} from './infoconstants';
//
export class Etudiant extends DepartementPerson implements IEtudiant {
    constructor(oMap?: any) {
        super(oMap);
    }
    public type(): string {
        return ETUDIANT_TYPE;
    }
    public store_prefix(): string {
        return ETUDIANT_PREFIX;
    }
    public check_person(oPers: Person): boolean {
		if ((oPers === undefined) || (oPers === null)) {
            return false;
        }
        let bRet: boolean = super.check_person(oPers);
        let xid: string = this.id;
        if ((xid !== undefined) && (xid !== null)) {
            let oAr: string[] = oPers.etudiantids;
            if ((oAr === undefined) || (oAr === null)) {
                oAr = [];
            }
            if (this.add_id_to_array(oAr, xid)) {
                oPers.etudiantids = oAr;
                bRet = true;
            }
        }// xid
        return bRet;
    }// check_person
}// class Etudiant