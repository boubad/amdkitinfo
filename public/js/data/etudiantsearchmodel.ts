//etudiantserachmodel.ts
//
import {BaseConsultViewModel} from './baseconsultmodel';
import {UserInfo} from './userinfo';
import {IPerson, IEtudiant, IGroupe} from 'infodata';
//
export class EtudiantSearchModel extends BaseConsultViewModel<IEtudiant> {
	//
	//
	private _date: string = null;
    private _current_person: IPerson = null;
	public canFetch: boolean;
	private _etuds: IPerson[];
	private _groupes: IGroupe[];
	//
	//
	constructor(info: UserInfo) {
		super(info);
		this.canFetch = true;
	}// constructor
	protected get_groupes(): IGroupe[] {
		return ((this._groupes !== undefined) && (this._groupes !== null)) ? this._groupes : [];
	}
	protected post_update_departement(): Promise<boolean> {
		return super.post_update_departement().then((r) => {
			return this.get_departement_groupetps();
		}).then((gg) => {
			this._groupes = gg;
			return true;
		})
    }
	protected get_all_ids(): Promise<string[]> {
		this.canFetch = false;
		this._etuds = [];
		let oRet: string[] = [];
		let model = this.currentPerson;
		let selector: any = {};
		model.to_map(selector);
		return this.dataService.query_items(model.type(), selector).then((rr: IPerson[]) => {
			this._etuds = this.filter_persons(rr);
			for (let p of this._etuds) {
				oRet.push(p.id);
			}
			this.canFetch = true;
			return oRet;
		}).catch((e) => {
			this.canFetch = true;
			return [];
		})
	}// get_all_ids
	protected filter_persons(init: IPerson[]): IPerson[] {
		let oRet: IPerson[] = [];
		if ((init !== undefined) && (init !== null)) {
			let nGroupeid = (this.groupeid !== undefined) ? this.groupeid : null;
			let nDepartementid = (this.departementid !== undefined) ? this.departementid : null;
			if ((nGroupeid !== null) && (nGroupeid.trim().length < 1)) {
				nGroupeid = null;
			}
			if ((nDepartementid !== null) && (nDepartementid.trim().length < 1)) {
				nDepartementid = null;
			}
			for (let p of init) {
				let bDep: boolean = true;
				let bGroupe: boolean = true;
				if (nDepartementid !== null) {
					bDep = false;
					let ids: string[] = ((p.departementids !== undefined) && (p.departementids !== null)) ? p.departementids : [];
					for (let id of ids) {
						if (id == nDepartementid) {
							bDep = true;
							break;
						}
					}//id
				}// dep
				if (nGroupeid !== null) {
					bGroupe = false;
					let ids: string[] = ((p.groupeids !== undefined) && (p.groupeids !== null)) ? p.groupeids : [];
					for (let id of ids) {
						if (id == nGroupeid) {
							bGroupe = true;
							break;
						}
					}//id
				}// dep
				if (bGroupe && bDep) {
					this.add_item_to_array(oRet, p);
				}
			}// p
		}// init
		return oRet;
	}// filter_persons
	public refreshAll(): Promise<any> {
		this.prepare_refresh();
		let nc = this.itemsPerPage;
		this.clear_error();
		return this.get_all_ids().then((ids) => {
			let oo = ((ids !== undefined) && (ids !== null)) ? ids : [];
			let nt = oo.length;
			this.allIds = oo;
			let np = Math.floor(nt / nc);
			if ((np * nc) < nt) {
				++np;
				this.pagesCount = np;
			}
			return this.refresh();
		}).catch((err) => {
			this.set_error(err);
			return false;
		})
	}// refreshAll
	public refresh(): Promise<any> {
		this.canFetch = false;
		this.pageStatus = null;
		this.clear_error();
		let model = this.modelItem;
		if (this.items.length > 0) {
			for (let elem of this.items) {
				let x = elem.url;
				if (x !== null) {
					this.revokeUrl(x);
					elem.url = null;
				}
			}// elem
		}
		this.items = [];
		let nbItems = this._etuds.length;
		let nc = this.itemsPerPage;
		let istart = (this.currentPage - 1) * nc;
		if (istart < 0) {
			istart = 0;
		}
		let iend = istart + nc - 1;
		if (iend >= nbItems) {
			iend = nbItems - 1;
		}
		let xids: string[] = [];
		for (let i = istart; i <= iend; ++i) {
			let y = this._etuds[i];
			let yc = y.etudiantids;
			if ((yc !== undefined) && (yc !== null) && (yc.length > 0)) {
				for (let yx of yc) {
					xids.push(yx);
				}//yx
			}
		}
		return this.dataService.get_items_array(xids).then((zz: IEtudiant[]) => {
			return this.retrieve_avatars(zz);
		}).then((xx: IEtudiant[]) => {
			this.items = [];
			if ((xx !== undefined) && (xx !== null)) {
				for (let x of xx) {
					this.add_item_to_array(this.items, x);
				}
			}
			this.canFetch = true;
			this.pageStatus = this.get_pageStatus();
			return true;
		}).catch((e) => {
			this.canFetch = true;
			return false;
		});
	}// refresh
	protected create_person(): IPerson {
        return this.itemFactory.create_person();
    }
	protected create_item(): IEtudiant {
        return this.itemFactory.create_etudiant();
    }
	public get currentPerson(): IPerson {
		if ((this._current_person === undefined) || (this._current_person === null)) {
			this._current_person = this.create_person();
		}
        return this._current_person;
    }
    public set currentPerson(s: IPerson) {
        this._current_person = ((s !== undefined) && (s !== null)) ?
			s : this.create_person();
    }
	protected perform_activate(): Promise<any> {
		return super.perform_activate().then((r) => {
			if (this._current_person === null) {
				this._current_person = this.create_person();
			}
			return true;
		});
	}// perform_activate
	public get firstname(): string {
        return this.currentPerson.firstname;
    }
    public set firstname(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.firstname = s;
        }
    }
    public get lastname(): string {
        return this.currentPerson.lastname;
    }
    public set lastname(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.lastname = s;
        }
    }
	public get dossier(): string {
        return this.currentPerson.dossier;
    }
    public set dossier(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.dossier = s;
        }
    }
    public get sexe(): string {
        return this.currentPerson.sexe;
    }
    public set sexe(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.sexe = s;
        }
    }
    public get birthDate(): string {
        return this._date;
    }
    public set birthDate(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.birthDate = this.string_to_date(s);
            this._date = this.date_to_string(x.birthDate);
        }
    }
    public get ville(): string {
        return this.currentPerson.ville;
    }
    public set ville(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.ville = s;
        }
    }
    public get etablissement(): string {
        return this.currentPerson.etablissement;
    }
    public set etablissement(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.etablissement = s;
        }
    }
    public get serieBac(): string {
        return this.currentPerson.serieBac;
    }
    public set serieBac(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.serieBac = s;
        }
    }
    public get optionBac(): string {
        return this.currentPerson.optionBac;
    }
    public set optionBac(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.optionBac = s;
        }
    }
    public get mentionBac(): string {
        return this.currentPerson.mentionBac;
    }
    public set mentionBac(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.mentionBac = s;
        }
    }
    public get etudesSuperieures(): string {
        return this.currentPerson.etudesSuperieures;
    }
    public set etudesSuperieures(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.etudesSuperieures = s;
        }
    }
	public get apb(): string {
        return this.currentPerson.apb;
    }
    public set apb(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.apb = s;
        }
    }
	public get birthYear(): string {
        return this.number_to_string(this.currentPerson.birthYear);
    }
    public set birthYear(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.birthYear = this.string_to_number(s);
        }
    }
}// class EtudiantSearchModel
