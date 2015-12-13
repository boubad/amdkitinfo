// siglenameditem.ts
//
import {BaseItem} from './baseitem';
import {ISigleNamedItem} from 'infodata';
//
export class SigleNamedItem extends BaseItem implements ISigleNamedItem {
	private _sigle: string;
	private _name: string;
	//
	constructor(oMap?: any) {
		super(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.sigle !== undefined) {
				this.sigle = oMap.sigle;
			}
			if (oMap.name !== undefined) {
				this.name = oMap.name;
			}
		}// oMap
	}
	//
	public get sigle(): string {
		return (this._sigle !== undefined) ? this._sigle : null;
	}
	public set sigle(s: string) {
		this._sigle = this.check_upper_string(s);
	}
	public get name(): string {
		return (this._name !== undefined) ? this._name : null;
	}
	public set name(s: string) {
		this._name = this.format_name(s);
	}
	//
	public create_id(): string {
		let s1: string = this.start_key();
        let s2: string = this.prepare_string(this.sigle);
        if (s1 == null) {
            s1 = "";
        }
        if (s2 == null) {
            s2 = "";
        }
        return (s1 + s2);
	}
	public is_storeable(): boolean {
        return (this.sigle != null) && (this.sigle.length > 0) &&
            (this.name != null) && (this.name.length > 0) && super.is_storeable();
    }
	public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (this.sigle !== null) {
                oMap.sigle = this.sigle;
            }
            if (this.name !== null) {
                oMap.name = this.name;
            }
        }
    }// toMap
	public sort_func(p1: ISigleNamedItem, p2: ISigleNamedItem): number {
        let s1 = p1.sigle;
        let s2 = p2.sigle;
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
	public toString(): string {
        return ((this.name !== null) && (this.name.length > 0)) ? this.name : this.sigle;
    }
}// class SigleNamedItem
