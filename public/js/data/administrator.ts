//administrator.ts
import {IAdministrator} from 'infodata';
import {DepartementPerson} from './departementperson';
import {Person} from './person';
import {ADMINISTRATOR_TYPE, ADMINISTRATOR_PREFIX} from './infoconstants';
//
export class Administrator extends DepartementPerson implements IAdministrator {
    constructor(oMap?: any) {
        super(oMap);
    }
    public type(): string {
        return ADMINISTRATOR_TYPE;
    }
    public store_prefix(): string {
        return ADMINISTRATOR_PREFIX;
    }
    public check_person(oPers: Person): boolean {
		 if ((oPers === undefined) || (oPers === null)) {
            return false;
        }
        let bRet: boolean = super.check_person(oPers);
        let xid: string = this.id;
        if ((xid !== undefined) && (xid !== null)) {
            let oAr: string[] = oPers.administratorids;
            if ((oAr === undefined) || (oAr === null)) {
                oAr = [];
            }
            if (this.add_id_to_array(oAr, xid)) {
                oPers.administratorids = oAr;
                bRet = true;
            }
        }// xid
        return bRet;
    }// check_person
}// class Administrator
