// infoelement.ts
//
import {IInfoElement} from 'infodata';
//
export class InfoElement implements IInfoElement {
	private _id: string;
	//
	constructor(oMap?: any) {
		if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap._id !== undefined) {
				this.id = oMap._id;
			}
			if (oMap.id !== undefined) {
				this.id = oMap.id;
			}
		}
	}
	public get id(): string {
		return (this._id !== undefined) ? this._id : null;
	}
	public set id(s: string) {
		this._id = this.check_string(s);
	}
	public get has_id(): boolean {
		return (this.id !== null);
	}
	public toString(): string {
		let s = this.id;
		return (s !== null) ? s : '';
	}
	public get text(): string {
		let s = this.toString();
		return (s !== null) ? s : '';
	}
	public sort_func<T extends IInfoElement>(p1: T, p2: T): number {
		let pp1 = (p1 !== undefined) ? p1 : null;
		let pp2 = (p2 !== undefined) ? p2 : null;
		if ((pp1 !== null) && (pp2 !== null)) {
			return pp1.text.localeCompare(pp2.text);
		} else if ((pp1 !== null) && (pp2 === null)) {
			return -1;
		} else if ((pp1 === null) && (pp2 !== null)) {
			return 1;
		} else {
			return 0;
		}
	}// sort_func
	//
	protected check_string(s: string): string {
		if ((s === undefined) || (s === null)) {
			return null;
		}
		let ss = s.toString().trim();
		return ((ss !== null) && (ss.length > 0)) ? ss : null;
	}
	protected check_upper_string(s: string): string {
		if ((s === undefined) || (s === null)) {
			return null;
		}
		let ss = s.toString().trim();
		return ((ss !== null) && (ss.length > 0)) ? ss.toUpperCase() : null;
	}
	protected format_name(s: string) {
		if ((s === undefined) || (s === null)) {
			return null;
		}
		let ss = s.toString().trim();
        if ((ss !== null) && (ss.length > 0)) {
            if (ss.length > 1) {
                ss = ss.substr(0, 1).toUpperCase() + ss.substr(1);
            } else {
                ss = ss.toUpperCase();
            }
        }// ss
		return ss;
    }
	protected string_to_date(s: any): Date {
        let dRet: Date = null;
        if ((s !== undefined) && (s !== null)) {
            try {
                let t = Date.parse(s.toString());
                if (!isNaN(t)) {
                    dRet = new Date(t);
                }
            } catch (e) {
            }
        }
        return dRet;
    }
    protected date_to_string(d: Date): string {
        let sRet: string = null;
        if ((d !== undefined) && (d !== null)) {
            try {
                let t = Date.parse(d.toString());
                if (!isNaN(t)) {
                    let dd = new Date(t);
					if ((dd !== undefined) && (dd !== null)) {
						sRet = dd.toISOString().substr(0, 10);
					}
                }
            } catch (e) { }
        }
        return sRet;
    }
    protected number_to_string(n: number): string {
        return ((n !== undefined) && (n !== null)) ? n.toString() : null;
    }
    protected string_to_number(s: any): number {
        let dRet: number = null;
        if ((s !== undefined) && (s !== null)) {
            try {
                let x = parseFloat(s);
                if (!isNaN(x)) {
                    dRet = x;
                }
            } catch (e) { }
        }// s
        return dRet;
    }
    protected check_date(d: any): Date {
        return this.string_to_date(d);
    } // check_date
    protected check_number(s: any): number {
        return this.string_to_number(s);
    }
	//
    protected format_note(s: number): number {
        return (Math.floor(s * 100.0 + 0.5)) / 100.0;
    }
	protected prepare_string(s: string,bUpper?:boolean): string {
		let sRet: string = null;
		if ((s !== undefined) && (s !== null)) {
			sRet = s.trim();
			if (sRet.length < 1) {
				sRet = null;
			} else {
				sRet = sRet.toLowerCase();
				sRet = sRet.replace(" ", "");
				sRet = sRet.replace("'", "");
				sRet = sRet.replace("é", "e");
				sRet = sRet.replace("è", "e");
				sRet = sRet.replace("à", "a");
				sRet = sRet.replace("ç", "c");
				sRet = sRet.replace("î", "i");
				sRet = sRet.replace("ô", "o");
				sRet = sRet.replace("û", "u");
				sRet = sRet.replace("â", "a");
				if ((bUpper !== undefined) && (bUpper !== null) && (bUpper == true)){
					sRet = sRet.toUpperCase();
				}
			}
		}
		return ((sRet !== undefined) && (sRet !== null) && (sRet.length > 1)) ? sRet : null;
	}// prepare_string
	protected create_username(slast: string, sfirst: string): string {
        let sRet: string = null;
        if ((slast !== undefined) && (slast !== null)) {
            let us = slast.trim().toLowerCase();
            if (us.length > 5) {
                sRet = us.substr(0, 5).trim();
            } else {
                sRet = us;
            }
        }
        if ((sfirst !== undefined) && (sfirst !== null)) {
            let us = sfirst.trim().toLowerCase();
            if (us.length > 3) {
                sRet = sRet + us.substr(0, 3).trim();
            } else {
                sRet = sRet + us;
            }
        }
		return this.prepare_string(sRet);
    }// create_username
	protected create_date_key(d: Date): string {
		let sRet: string = null;
		if ((d !== undefined) && (d !== null)) {
			let ss = d.toISOString().substr(0, 10);
			sRet = ss.replace("-", "");
		}
		return sRet;
	}
	protected sync_array<T extends IInfoElement>(cont: T[], id: string): T {
        let pSel: T = null;
        if ((cont !== undefined) && (cont !== null) && (cont.length > 0)) {
            if ((id !== undefined) && (id !== null)) {
                for (let x of cont) {
                    if ((x !== null) && (x.id == id)) {
                        pSel = x;
                        break;
                    }
                }// x
            }// id
            if (pSel === null) {
                pSel = cont[0];
            }
        }// cont
        return pSel;
    }// sync_departements
	protected add_item_to_array<T extends IInfoElement>(cont: T[], item: T): boolean {
		if ((cont == undefined) || (cont == null)) {
			cont = [];
		}
        if ((item === undefined) || (item === null)) {
            return false;
        }
		let id: string = item.id;
		if ((id === undefined) || (id === null)) {
            return false;
        }
        let bFound = false;
        for (let p of cont) {
            if (p.id == id) {
                bFound = true;
            }
        }// p
        if (!bFound) {
            cont.push(item);
            return true;
        }
        return false;
    }// add_id_to_array
    protected add_id_to_array(cont: string[], id: string): boolean {
		if ((cont == undefined) || (cont == null)) {
			cont = [];
		}
        if ((id === undefined) || (id === null)) {
            return false;
        }
        let bFound = false;
        for (let p of cont) {
            if (p == id) {
                bFound = true;
            }
        }// p
        if (!bFound) {
            cont.push(id);
            return true;
        }
        return false;
    }// add_id_to_array
	protected add_array_to_array(cont: string[], oAr: string[]): void {
		if ((oAr !== undefined) && (oAr !== null)) {
			let n = oAr.length;
			for (let i = 0; i < n; ++i) {
				this.add_id_to_array(cont, oAr[i]);
			}// i
		}// oAr
	}//add_array_to_array
    public static string_to_date(s: any): Date {
        let dRet: Date = null;
        if ((s !== undefined) && (s !== null)) {
            try {
                let t = Date.parse(s.toString());
                if (!isNaN(t)) {
                    dRet = new Date(t);
                }
            } catch (e) {
            }
        }
        return dRet;
    }
	protected contains_array_id(cont: string[], id: string): boolean {
		if ((cont == undefined) || (cont == null)) {
			return false;
		}
        if ((id === undefined) || (id === null)) {
            return false;
        }
        let bFound = false;
        for (let p of cont) {
            if (p == id) {
                bFound = true;
				break;
            }
        }// p
        return bFound;
    }// add_id_to_array
	protected convert_error(err: any): string {
		let sRet: string = null;
		if ((err !== undefined) && (err !== null)) {
            if ((err.message !== undefined) && (err.message !== null)) {
                sRet = (err.message.length > 0) ? err.message : 'Erreur inconnue...';
            } else if ((err.msg !== undefined) && (err.msg !== null)) {
                sRet = (err.msg.length > 0) ? err.msg : 'Erreur inconnue...';
            } else if ((err.reason !== undefined) && (err.reason !== null)) {
                sRet = err.reason;
            } else {
                sRet = JSON.stringify(err);
            }
        } else {
            sRet = 'Erreur inconnue...';
        }
		return sRet;
	}
	protected sort_array<T extends IInfoElement>(pp: T[]): void {
		if ((pp !== undefined) && (pp !== null) && (pp.length > 1)) {
			let p = pp[0];
			if ((p !== undefined) && (p !== null)) {
				let pf = p.sort_func;
				if ((pf !== undefined) && (pf !== null)) {
					pp.sort(pf);
				}// pf
			}//p
		}// pp
	}
	//
}// class InfoElement
