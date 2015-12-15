//userinfo.ts
//
import {IItemFactory, IDataService, IPerson, IDepartement, IAnnee, IUnite, IGroupe, ISemestre,
IMatiere, IUIManager, IInfoRouter} from 'infodata';
import {LoginInfo} from './logininfo';
import {InfoElement} from './infoelement';
import {UIManager} from './uimanager';
import {GENRE_TP} from './infoconstants';

//
export class UserInfo extends InfoElement {
	//
	public baseUrl: string = null;
	public router: IInfoRouter = null;
	public loginInfo: LoginInfo = new LoginInfo();
	public uiManager: IUIManager = null;
	//
    public annees: IAnnee[] = [];
    public semestres: ISemestre[] = [];
    public unites: IUnite[] = [];
    public matieres: IMatiere[] = [];
    public groupes: IGroupe[] = [];
    //
    private _annee: IAnnee = null;
    private _unite: IUnite = null;
    private _semestre: ISemestre = null;
    public matiere: IMatiere = null;
    public groupe: IGroupe = null;
	//
	private _bInDep: boolean = false;
	private _bInAnnee: boolean = false;
	private _bInUnite: boolean = false;
	//
	private _anneeMinDate: string = null;
	private _anneeMaxDate: string = null;
	private _semestreMinDate: string = null;
	private _semestreMaxDate: string = null;
	//
	private _gtps: IGroupe[] = [];
    //
	constructor(man?: IUIManager) {
		super();
		if ((man !== undefined) && (man !== null)) {
			this.uiManager = man;
		}
		let origin = window.location.origin;
		let pathname = window.location.pathname;
		this.baseUrl = origin + pathname.toLowerCase().replace("index.html", "");
		if (!this.baseUrl.endsWith("/")) {
			this.baseUrl = this.baseUrl + "/";
		}
	}// constructor
	public get_departement_groupetps(): Promise<IGroupe[]> {
		return Promise.resolve(this._gtps);
	}//get_departement_groupetps
	public get anneeMinDate(): string {
		return (this._anneeMinDate !== undefined) ? this._anneeMinDate : null;
	}
	public get anneeMaxDate(): string {
		return (this._anneeMaxDate !== undefined) ? this._anneeMaxDate : null;
	}
	public get semestreMinDate(): string {
		return (this._semestreMinDate !== undefined) ? this._semestreMinDate : null;
	}
	public get semestreMaxDate(): string {
		return (this._semestreMaxDate !== undefined) ? this._semestreMaxDate : null;
	}
	public get is_in_departement_change(): boolean {
		return this._bInDep;
	}
	public get is_in_annee_change(): boolean {
		if (this.is_in_departement_change) {
			return true;
		}
		return this._bInAnnee;
	}
	public get is_in_unite_change(): boolean {
		if (this.is_in_departement_change) {
			return true;
		}
		return this._bInUnite;
	}
	//
	
	public navigate_to(route: string, args?: any): any {
		if ((this.router !== null) && (route !== undefined) && (route !== null)) {
			this.router.navigate_to(route, args);
		}
	}
	public get dataService(): IDataService {
		return this.loginInfo.dataService;
	}
	public get itemFactory(): IItemFactory {
		return this.loginInfo.itemfactory;
	}
    //
    public get departements(): IDepartement[] {
        return this.loginInfo.all_departements;
    }
	public get departement(): IDepartement {
		return this.loginInfo.departement;
    }
	public change_departement(s: IDepartement): Promise<boolean> {
		let cur = (s !== undefined) ? s : null;
		this.loginInfo.departement = cur;
		return this.get_tps().then((gg) => {
			this._gtps = gg;
			return this.post_update_departement();
		});
	}// change_departement
    public set departement(s: IDepartement) {
		if (!this._bInDep) {
			this._bInDep = true;
			this.change_departement(s).then((b) => {
				this._bInDep = false;
			});
		}
	}
    //
    public get semestre(): ISemestre {
        return (this._semestre !== undefined) ? this._semestre : null;
    }
    public set semestre(s: ISemestre) {
		this._semestre = (s !== undefined) ? s : null;
		if ((this._semestre !== undefined) && (this._semestre !== null)) {
			let a: Date = this._semestre.startDate;
			if ((a !== undefined) && (a !== null)) {
				this._semestreMinDate = a.toISOString().substr(0, 10);
			}
			a = this.semestre.endDate;
			if ((a !== undefined) && (a !== null)) {
				this._semestreMaxDate = a.toISOString().substr(0, 10);
			}
		}
    }
    public get annee(): IAnnee {
        return this._annee;
    }
    public set annee(s: IAnnee) {
		if (!this._bInAnnee) {
			this._bInAnnee = true;
			this._annee = (s !== undefined) ? s : null;
			if ((this._annee !== undefined) && (this._annee !== null)) {
				let a: Date = this._annee.startDate;
				if ((a !== undefined) && (a !== null)) {
					this._anneeMinDate = a.toISOString().substr(0, 10);
				}
				a = this.annee.endDate;
				if ((a !== undefined) && (a !== null)) {
					this._anneeMaxDate = a.toISOString().substr(0, 10);
				}
			}
			this.post_update_annee().then((b) => {
				this._bInAnnee = false;
			});
		}// not busy
    }
    public get unite(): IUnite {
        return (this._unite !== undefined) ? this._unite : null;
    }
    public set unite(s: IUnite) {
		if (!this._bInUnite) {
			this._bInUnite = true;
			this._unite = (s !== undefined) ? s : null;
			this.post_update_unite().then((b) => {
				this._bInUnite = false;
			})
		}
    }
    //
    public get person(): IPerson {
        return this.loginInfo.person;
    }// get person
	//
	
	public get departementid(): string {
		return (this.departement !== null) ? this.departement.id : null;
	}
	public get anneeid(): string {
		return (this.annee !== null) ? this.annee.id : null;
	}
	public get semestreid(): string {
		return (this.semestre !== null) ? this.semestre.id : null;
	}
	public get groupeid(): string {
		return (this.groupe !== null) ? this.groupe.id : null;
	}
	public get uniteid(): string {
		return (this.unite !== null) ? this.unite.id : null;
	}
	public get matiereid(): string {
		return (this.matiere !== null) ? this.matiere.id : null;
	}
	//
	public get departementName(): string {
		return (this.departement !== null) ? this.departement.text : null;
	}
	public get anneeName(): string {
		return (this.annee !== null) ? this.annee.text : null;
	}
	public get semestreName(): string {
		return (this.semestre !== null) ? this.semestre.text : null;
	}
	public get groupeName(): string {
		return (this.groupe !== null) ? this.groupe.text : null;
	}
	public get uniteName(): string {
		return (this.unite !== null) ? this.unite.text : null;
	}
	public get matiereName(): string {
		return (this.matiere !== null) ? this.matiere.text : null;
	}
	//
	private clear_data(): void {
        if ((this.person !== null) && (this.person.url !== null)) {
            this.uiManager.revokeUrl(this.person.url);
			this.person.url = null;
        }
        this.loginInfo.disconnect();
        this.annees = [];
        this.semestres = [];
        this.unites = [];
        this.matieres = [];
        this.groupes = [];
		this._annee = null;
		this._semestre = null;
		this._unite = null;
		this.matiere = null;
		this.groupe = null;
    }// clear_data
    public login(username: string, spass: string): Promise<boolean> {
        this.clear_data();
        let bRet: boolean = false;
		let pPers: IPerson = null;
        return this.loginInfo.login(username, spass).then((b) => {
			pPers = this.person;
			let id = (pPers !== null) ? pPers.id : null;
			let avid = (pPers !== null) ? pPers.avatarid : null;
			return this.dataService.find_attachment(id, avid);
		}).then((data) => {
			if ((data !== undefined) && (data !== null)) {
				pPers.url = this.uiManager.createUrl(data);
			}
			bRet = (pPers !== null);
			return bRet;
		}).catch((err) => {
			return bRet;
		});
    }// login
    public logout(): void {
        this.clear_data();
    }// logout
    public get is_super(): boolean {
		return this.loginInfo.is_super;
    }
    public get is_admin(): boolean {
		return this.loginInfo.is_admin;
    }
    public get is_prof(): boolean {
        return this.loginInfo.is_prof;
    }
    public get is_etud(): boolean {
        return this.loginInfo.is_etud;
    }
    public get url(): string {
        return (this.person !== null) ? this.person.url : null;
    }
    public get has_url(): boolean {
        return (this.url !== null);
    }
    public get personid(): string {
        return (this.person !== null) ? this.person.id : null;
    }
    public get fullname(): string {
        return (this.person !== null) ? this.person.fullname : null;
    }
    public get is_connected(): boolean {
        return this.loginInfo.is_connected;
    }
    public get is_notconnected(): boolean {
        return (!this.is_connected);
    }
    //
    private post_update_departement(): Promise<boolean> {
        let xannees: IAnnee[] = [];
        let xunites: IUnite[] = [];
        let xgroupes: IGroupe[] = [];
        //
		let dep = this.departement;
        if (dep === null) {
            this.annees = xannees;
            this.unites = xunites;
            this.groupes = xgroupes;
			this._annee = null;
			this._unite = null;
			this.groupe = null;
            return Promise.resolve(true);
        }
        let pPers: IPerson = this.person;
        if (pPers === null) {
            this.annees = xannees;
            this.unites = xunites;
            this.groupes = xgroupes;
			this._annee = null;
			this._unite = null;
			this.groupe = null;
            return Promise.resolve(true);
        }
		let depid: string = dep.id;
		let sel: any = { departementid: depid };
        if (this.is_super || this.is_admin) {
            let service = this.dataService;
			let model = this.itemFactory.create_annee();
			let stype: string = model.type();
			return this.dataService.query_items(stype, sel).then((dd: IAnnee[]) => {
				xannees = ((dd !== undefined) && (dd !== null)) ? dd : [];
				let model = this.itemFactory.create_groupe();
				let stype: string = model.type();
				return this.dataService.query_items(stype, sel);
			}).then((gg: IGroupe[]) => {
				xgroupes = ((gg !== undefined) && (gg !== null)) ? gg : [];
				let model = this.itemFactory.create_unite();
				let stype: string = model.type();
				return this.dataService.query_items(stype, sel);
			}).then((uu: IUnite[]) => {
				xunites = ((uu !== undefined) && (uu !== null)) ? uu : [];
				this.annees = xannees;
				this.unites = xunites;
				this.groupes = xgroupes;
				if (this.annees.length > 0) {
					this._annee = this.annees[0];
				} else {
					this._annee = null;
				}
				if (this.unites.length > 0) {
					this._unite = this.unites[0];
				} else {
					this._unite = null;
				}
				if (this.groupes.length > 0) {
					this.groupe = this.groupes[0];
				} else {
					this.groupe = null;
				}
				return this.post_update_annee();
			}).then((vx) => {
				return this.post_update_unite();
			}).then((df) => {
				return true;
			});
		} else {
			if (this.loginInfo.all_annees !== null) {
				for (let x of this.loginInfo.all_annees) {
					if (x.departementid == depid) {
						xannees.push(x);
					}
				}//x
			}
			if (this.loginInfo.all_unites !== null) {
				for (let x of this.loginInfo.all_unites) {
					if (x.departementid == depid) {
						xunites.push(x);
					}
				}//x
			}
			if (this.loginInfo.all_groupes !== null) {
				for (let x of this.loginInfo.all_groupes) {
					if (x.departementid == depid) {
						xgroupes.push(x);
					}
				}//x
			}
			this.unites = xunites;
			this.annees = xannees;
			this.groupes = xgroupes;
			if (this.annees.length > 0) {
				this._annee = this.annees[0];
			} else {
				this._annee = null;
			}
			if (this.unites.length > 0) {
				this._unite = this.unites[0];
			} else {
				this.unite = null;
			}
			if (this.groupes.length > 0) {
				this.groupe = this.groupes[0];
			} else {
				this.groupe = null;
			}
			return this.post_update_annee().then((a) => {
				return this.post_update_unite();
			}).then((b) => {
				return true;
			});
		}
    }// post_update_departement
    private post_update_annee(): Promise<boolean> {
		let xsemestres: ISemestre[] = [];
		let an = this._annee;
		if ((an === undefined) || (an === null)) {
			this.semestres = xsemestres;
			this._semestre = null;
			return Promise.resolve(true);
		}
        let anneeid = an.id;
		let pPers: IPerson = this.person;
		if (pPers === null) {
			this.semestres = xsemestres;
			this._semestre = null;
			return Promise.resolve(true);
		}
        if (this.is_admin || this.is_super) {
			let sel: any = { anneeid: anneeid };
			let model = this.itemFactory.create_semestre();
			let stype: string = model.type();
			return this.dataService.query_items(stype, sel).then((dd: ISemestre[]) => {
				this.semestres = ((dd !== undefined) && (dd !== null)) ? dd : [];
				if (this.semestres.length > 0) {
					this._semestre = this.semestres[0];
				} else {
					this._semestre = null;
				}
				this._bInAnnee = false;
				return true;
			});
		} else if (this.loginInfo.all_semestres !== null) {
			for (let x of this.loginInfo.all_semestres) {
				if (x.anneeid == anneeid) {
					xsemestres.push(x);
				}
			}//x
			this.semestres = xsemestres;
			if (this.semestres.length > 0) {
				this._semestre = this.semestres[0];
			} else {
				this._semestre = null;
			}
			return Promise.resolve(true);
		}
    }// post_change_annee
    private post_update_unite(): Promise<boolean> {
		let xmatieres: IMatiere[] = [];
		let un = this.unite;
		if (un === null) {
			this.matieres = xmatieres;
			this.matiere = null;
			return Promise.resolve(true);
		}
        let uniteid = un.id;
		let pPers: IPerson = this.person;
		if (pPers === null) {
			this.matieres = xmatieres;
			this.matiere = null;
			return Promise.resolve(true);
		}
        if (this.is_admin || this.is_super) {
			let sel: any = { uniteid: uniteid };
			let model = this.itemFactory.create_matiere();
			let stype: string = model.type();
			return this.dataService.query_items(stype, sel).then((dd: IMatiere[]) => {
				this.matieres = ((dd !== undefined) && (dd !== null)) ? dd : [];
				if (this.matieres.length > 0) {
					this.matiere = this.matieres[0];
				} else {
					this.matiere = null;
				}
				return true;
			});
		} else if (this.loginInfo.all_matieres !== null) {
			for (let x of this.loginInfo.all_matieres) {
				if (x.uniteid == uniteid) {
					xmatieres.push(x);
				}
			}//x
			this.matieres = xmatieres;
			if (this.matieres.length > 0) {
				this.matiere = this.matieres[0];
			} else {
				this.matiere = null;
			}
			return Promise.resolve(true);
		}
    }// post_change_unite
	private get_tps(): Promise<IGroupe[]> {
		let oRet: IGroupe[] = [];
		let model = this.itemFactory.create_groupe();
		return this.dataService.query_items(model.type(), {
			departementid: this.departementid,
			genre: GENRE_TP
		}).then((gg: IGroupe[]) => {
			oRet = ((gg !== undefined) && (gg !== null)) ? gg : [];
			return oRet;
		}).catch((e) => {
			return oRet;
		});
	}// get_tps 
}// class UserInfo
