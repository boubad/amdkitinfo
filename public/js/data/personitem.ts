//personitem.ts
import {IPersonItem,IPerson} from 'infodata';
import {BaseItem} from './baseitem';
//
export class PersonItem extends BaseItem implements IPersonItem {
	//
	private _departementid: string;
	private _departementName: string;
    private _personid: string;
    private _firstname: string;
    private _lastname: string;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.departementid !== undefined) {
                this.departementid = oMap.departementid;
            }
			if (oMap.departementName !== undefined) {
                this.departementName = oMap.departementName;
            }
            if (oMap.personid !== undefined) {
                this.personid = oMap.personid;
            }
            if (oMap.firstname !== undefined) {
                this.firstname = oMap.firstname;
            }
            if (oMap.lastname !== undefined) {
                this.lastname = oMap.lastname;
            }
        }// oMap
    }// constructor
    
    public to_map(oMap: any): void {
        super.to_map(oMap);
		if (this.departementid !== null) {
			oMap.departementid = this.departementid;
		}
		if (this.departementName !== null) {
			oMap.departementName = this.departementName;
		}
		if (this.personid !== null) {
			oMap.personid = this.personid;
		}
		if (this.firstname !== null) {
			oMap.firstname = this.firstname;
		}
		if (this.lastname !== null) {
			oMap.lastname = this.lastname;
		}
    }// to_map
	public get departementName(): string {
		return (this._departementName !== undefined) ? this._departementName : null;
    }
    public set departementName(s: string) {
		this._departementName = this.check_string(s);
    }
	public get departementid(): string {
		return (this._departementid !== undefined) ? this._departementid : null;
    }
    public set departementid(s: string) {
		this._departementid = this.check_string(s);
    }
    public get personid(): string {
		return (this._personid !== undefined) ? this._personid : null;
    }
    public set personid(s: string) {
		this._personid = this.check_string(s);
    }
    public get firstname(): string {
		return (this._firstname !== undefined) ? this._firstname : null;
    }
    public set firstname(s: string) {
		this._firstname = this.format_name(s);
    }
    public get lastname(): string {
		return (this._lastname !== undefined) ? this._lastname : null;
    }
    public set lastname(s: string) {
		this._lastname = this.check_upper_string(s);
    }
    public is_storeable(): boolean {
        return (this.personid !== null) && (this.departementid !== null) &&
            (this.firstname !== null) && (this.lastname !== null) &&
            super.is_storeable();
    }
    public avatardocid(): string {
        return this.personid;
    }
	public get_person_id():string {
		return this.personid;
	}
    public get fullname(): string {
        return ((this.lastname !== null) && (this.firstname !== null)) ?
            (this.lastname + ' ' + this.firstname) : '';
    } // fullname
	public toString(): string {
        return this.fullname;
    }
    public sort_func(p1: IPersonItem, p2: IPersonItem): number {
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
    //
    public check_person(oPers: IPerson): boolean {
		this.check_id();
        if ((oPers === undefined) || (oPers === null)) {
            return false;
        }
		let xid: string = oPers.id;
		if (xid === null) {
			return false;
		}
        if (this.personid != xid) {
            this.personid = xid;
        }
        if (this.lastname != oPers.lastname) {
            this.lastname = oPers.lastname;
        }
        if (this.firstname != oPers.firstname) {
            this.firstname = oPers.firstname;
        }
		if ((oPers.avatarid !== undefined) && (oPers.avatarid !== null)) {
			if ((this.avatarid === undefined) || (this.avatarid === null)) {
				this.avatarid = oPers.avatarid;
			}
		}
		let xx:string[] = oPers.departementids;
		if (this.add_id_to_array(xx,this.departementid)) {
			oPers.departementids = xx;
			return true;
		}
		return false;
    }// check_person
    //
}// class PersonItem
