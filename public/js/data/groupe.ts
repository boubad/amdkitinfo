//groupe.ts
import {IGroupe} from 'infodata';
import {DepartementSigleNamedItem} from './departementsiglenameditem';
import {GROUPE_TYPE, GROUPE_PREFIX, GENRE_PROMO, GENRE_TD, GENRE_TP} from './infoconstants';
//
export class Groupe extends DepartementSigleNamedItem implements IGroupe {
	//
	private _genre: string;
	private _parent_id: string;
	private _children: string[];
	//
	constructor(oMap?: any) {
		super(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.parentid !== undefined) {
				this._parent_id = oMap.parentid;
			}
			if (oMap.genre !== undefined) {
				this._genre = oMap.genre;
			}
			if ((oMap.childrenids !== undefined) && (oMap.childrenids !== null)) {
				this._children = oMap.childrenids;
			}
		}// oMap
	}
	public get is_leaf():boolean {
		return ((this.genre !== null) && (this.genre == GENRE_TP));
	}
	public add_child(g: IGroupe): void {
		let genre1 = this.genre;
		if ((genre1 === undefined) || (genre1 === null)) {
			return;
		}
		if (genre1 == GENRE_TP) {
			return;
		}
		if ((g === undefined) || (g === null)) {
			return;
		}
		this.check_id();
		g.check_id();
		if (g.parentid !== null) {
			if (this.id != g.parentid) {
				return;
			}
		}
		let xgenre = g.genre;
		if ((xgenre === undefined) || (xgenre === null)) {
			return;
		}
		if (genre1 == xgenre) {
			return;
		}
		if (genre1 == GENRE_TD) {
			if (xgenre != GENRE_TP) {
				return;
			}
		} else if (genre1 == GENRE_PROMO) {
			if (xgenre != GENRE_TD) {
				return;
			}
		}
		if ((this._children === undefined) || (this._children === null)) {
			this._children = [];
		}
		let xid = g.id;
		let bFound: boolean = false;
		for (let x of this._children) {
			if (x == xid) {
				bFound = true;
				break;
			}
		}// x
		if (!bFound) {
			this._children.push(xid);
		}
		g.parentid = this.id;
		this.selected = true;
		g.selected = true;
	}// add_child
	public remove_child(g: IGroupe): boolean {
		if ((this._children === undefined) || (this._children === null)) {
			return false;
		}
		if ((g === undefined) || (g === null)) {
			return false;
		}
		this.check_id();
		g.check_id();
		let xid = g.id;
		let oRet: string[] = [];
		let bFound: boolean = false;
		for (let x of this._children) {
			if (x != xid) {
				oRet.push(x);
			} else {
				bFound = true;
			}
		}// x
		if (bFound) {
			this._children = oRet;
			g.parentid = null;
			this.selected = true;
			g.selected = true;
		}
		return bFound;
	}// remove_child
	public to_map(oMap: any): void {
		super.to_map(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if (this.parentid !== null) {
				oMap.parentid = this.parentid;
			}
			if (this.genre !== null) {
				oMap.genre = this.genre;
			}
			if (this.childrenids.length > 0) {
				oMap.childrenids = this.childrenids;
			}
		}
    }// toMap
	public get parentid(): string {
		return (this._parent_id !== undefined) ? this._parent_id : null;
	}
	public set parentid(s: string) {
		this._parent_id = s;
	}
	public get has_parent(): boolean {
		return (this.parentid !== null);
	}
	
	public get genre(): string {
		return (this._genre !== undefined) ? this._genre : null;
	}
	public set genre(s: string) {
		this._genre = this.check_upper_string(s);
	}
	public get childrenids(): string[] {
		return ((this._children !== undefined) && (this._children !== null)) ? this._children : [];
	}
	public set childrenids(ss: string[]) {
		this._children = ss;
	}
	public get has_children(): boolean {
		return (this.childrenids.length > 0);
	}
	public type(): string {
        return GROUPE_TYPE;
    }
    public store_prefix(): string {
        return GROUPE_PREFIX;
    }
}// class Groupe
