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
	private _router: IInfoRouter;
	private _loginInfo: LoginInfo;
	private _uimanager: IUIManager;
	//
    private _annees: IAnnee[];
    private _semestres: ISemestre[];
    private _unites: IUnite[];
    private _matieres: IMatiere[];
    private _groupes: IGroupe[];
    //
    private _annee: IAnnee;
    private _unite: IUnite;
    private _semestre: ISemestre;
    private _matiere: IMatiere;
    private _groupe: IGroupe;
	//
	private _bInDep: boolean;
	private _bInAnnee: boolean;
	private _bInUnite: boolean;
	//
	private _anneeMinDate: string;
	private _anneeMaxDate: string;
	private _semestreMinDate: string;
	private _semestreMaxDate: string;
	//
	private _gtps: IGroupe[];
    //
	constructor(man?: IUIManager) {
		super();
		if ((man !== undefined) && (man !== null)) {
			this._uimanager = man;
		}
	}// constructor
	public get_departement_groupetps(): Promise<IGroupe[]> {
		if ((this._gtps !== undefined) && (this._gtps !== null) && (this._gtps.length > 0)) {
			return Promise.resolve(this._gtps);
		}
		let model = this.itemFactory.create_groupe();
		return this.dataService.query_items(model.type(), {
			departementid: this.departementid,
			genre: GENRE_TP
		}).then((gg: IGroupe[]) => {
			this._gtps = (gg !== undefined) ? gg : [];
			return this._gtps;
		}).catch((e) => {
			return [];
		})
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
		return ((this._bInDep !== undefined) && (this._bInDep !== null)) ? this._bInDep : false;
	}
	public get is_in_annee_change(): boolean {
		if (this.is_in_departement_change) {
			return true;
		}
		return ((this._bInAnnee !== undefined) && (this._bInAnnee !== null)) ? this._bInAnnee : false;
	}
	public get is_in_unite_change(): boolean {
		if (this.is_in_departement_change) {
			return true;
		}
		return ((this._bInUnite !== undefined) && (this._bInUnite !== null)) ? this._bInUnite : false;
	}
	//
	public get router(): IInfoRouter {
		return (this._router !== undefined) ? this._router : null;
	}
	public set router(s: IInfoRouter) {
		this._router = s;
	}
	public navigate_to(route: string, args?: any): any {
		if ((this.router !== null) && (route !== undefined) && (route !== null)) {
			this.router.navigate_to(route, args);
		}
	}
	public get loginInfo(): LoginInfo {
		if ((this._loginInfo === undefined) || (this._loginInfo === null)) {
			this._loginInfo = new LoginInfo();
		}
		return this._loginInfo;
	}
	public get uiManager(): IUIManager {
		if ((this._uimanager === undefined) || (this._uimanager === null)) {
			this._uimanager = new UIManager();
		}
		return this._uimanager;
	}
	public get dataService(): IDataService {
		return this.loginInfo.dataService;
	}
	public get itemFactory(): IItemFactory {
		return this.loginInfo.itemfactory;
	}
	public get groupes(): IGroupe[] {
		return ((this._groupes !== undefined) && (this._groupes !== null)) ? this._groupes : [];
	}
	public set groupes(s: IGroupe[]) {
		this._groupes = s;
	}
	public get matieres(): IMatiere[] {
		return ((this._matieres !== undefined) && (this._matieres !== null)) ? this._matieres : [];
	}
	public set matieres(s: IMatiere[]) {
		this._matieres = s;
	}
	public get unites(): IUnite[] {
		return ((this._unites !== undefined) && (this._unites !== null)) ? this._unites : [];
	}
	public set unites(s: IUnite[]) {
		this._unites = s;
	}
	public get semestres(): ISemestre[] {
		return ((this._semestres !== undefined) && (this._semestres !== null)) ? this._semestres : [];
	}
	public set semestres(s: ISemestre[]) {
		this._semestres = s;
	}
	public get annees(): IAnnee[] {
		return ((this._annees !== undefined) && (this._annees !== null)) ? this._annees : [];
	}
	public set annees(s: IAnnee[]) {
		this._annees = s;
	}
    //
    public get departements(): IDepartement[] {
        return (this.loginInfo.all_departements !== null) ? this.loginInfo.all_departements : [];
    }
	public get departement(): IDepartement {
		return this.loginInfo.departement;
    }
    public set departement(s: IDepartement) {
		this._gtps = null;
        let cur = (s !== undefined) ? s : null;
		this.loginInfo.departement = cur;
		this.post_update_departement();
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
    public get groupe(): IGroupe {
        return (this._groupe !== undefined) ? this._groupe : null;
    }
    public set groupe(s: IGroupe) {
		this._groupe = (s !== undefined) ? s : null;
    }
    //
    public get matiere(): IMatiere {
        return (this._matiere !== undefined) ? this._matiere : null;
    }
    public set matiere(s: IMatiere) {
		this._matiere = (s !== undefined) ? s : null;
    }
    public get annee(): IAnnee {
        return (this._annee !== undefined) ? this._annee : null;
    }
    public set annee(s: IAnnee) {
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
		this.post_update_annee();
    }
    public get unite(): IUnite {
        return (this._unite !== undefined) ? this._unite : null;
    }
    public set unite(s: IUnite) {
		this._unite = (s !== undefined) ? s : null;
		this.post_update_unite();
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
        this._annees = [];
        this._semestres = [];
        this._unites = [];
        this._matieres = [];
        this._groupes = [];
		this._annee = null;
		this._semestre = null;
		this._unite = null;
		this._matiere = null;
		this._groupe = null;
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
    private post_update_departement(): Promise<any> {
		this._bInDep = true;
        //
        let xannees: IAnnee[] = [];
        let xunites: IUnite[] = [];
        let xgroupes: IGroupe[] = [];
        //
		let dep = this.departement;
        if (dep === null) {
            this._annees = xannees;
            this._unites = xunites;
            this._groupes = xgroupes;
			this._annee = null;
			this._unite = null;
			this._groupe = null;
			this._bInDep = false;
            return Promise.resolve(true);
        }
        let pPers: IPerson = this.person;
        if (pPers === null) {
            this._annees = xannees;
            this._unites = xunites;
            this._groupes = xgroupes;
			this._annee = null;
			this._unite = null;
			this._groupe = null;
			this._bInDep = false;
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
				this._annees = xannees;
				this._unites = xunites;
				this._groupes = xgroupes;
				if (this._annees.length > 0) {
					this._annee = this._annees[0];
				} else {
					this._annee = null;
				}
				if (this._unites.length > 0) {
					this._unite = this._unites[0];
				} else {
					this._unite = null;
				}
				if (this._groupes.length > 0) {
					this._groupe = this._groupes[0];
				} else {
					this._groupe = null;
				}
				return this.post_update_annee();
			}).then((vx) => {
				return this.post_update_unite();
			}).then((df) => {
				this._bInDep = false;
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
			this._unites = xunites;
			this._annees = xannees;
			this._groupes = xgroupes;
			if (this._annees.length > 0) {
				this._annee = this._annees[0];
			} else {
				this._annee = null;
			}
			if (this._unites.length > 0) {
				this._unite = this._unites[0];
			} else {
				this.unite = null;
			}
			if (this._groupes.length > 0) {
				this._groupe = this._groupes[0];
			} else {
				this.groupe = null;
			}
			return this.post_update_annee().then((a) => {
				return this.post_update_unite();
			}).then((b) => {
				this._bInDep = false;
				return true;
			});
		}
    }// post_update_departement
    private post_update_annee(): Promise<any> {
		this._bInAnnee = true;
		let xsemestres: ISemestre[] = [];
		let an = this._annee;
		if ((an === undefined) || (an === null)) {
			this._semestres = xsemestres;
			this._semestre = null;
			this._bInAnnee = false;
			return Promise.resolve(true);
		}
        let anneeid = an.id;
		let pPers: IPerson = this.person;
		if (pPers === null) {
			this._semestres = xsemestres;
			this._semestre = null;
			this._bInAnnee = false;
			return Promise.resolve(true);
		}
        if (this.is_admin || this.is_super) {
			let sel: any = { anneeid: anneeid };
			let model = this.itemFactory.create_semestre();
			let stype: string = model.type();
			return this.dataService.query_items(stype, sel).then((dd: ISemestre[]) => {
				this._semestres = ((dd !== undefined) && (dd !== null)) ? dd : [];
				if (this._semestres.length > 0) {
					this._semestre = this._semestres[0];
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
			this._semestres = xsemestres;
			if (this._semestres.length > 0) {
				this._semestre = this._semestres[0];
			} else {
				this._semestre = null;
			}
			this._bInAnnee = false;
			return Promise.resolve(true);
		}
    }// post_change_annee
    private post_update_unite(): Promise<any> {
		this._bInUnite = true;
		let xmatieres: IMatiere[] = [];
		let un = this.unite;
		if (un === null) {
			this._matieres = xmatieres;
			this._matiere = null;
			this._bInUnite = false;
			return Promise.resolve(true);
		}
        let uniteid = un.id;
		let pPers: IPerson = this.person;
		if (pPers === null) {
			this._matieres = xmatieres;
			this._matiere = null;
			this._bInUnite = false;
			return Promise.resolve(true);
		}
        if (this.is_admin || this.is_super) {
			let sel: any = { uniteid: uniteid };
			let model = this.itemFactory.create_matiere();
			let stype: string = model.type();
			return this.dataService.query_items(stype, sel).then((dd: IMatiere[]) => {
				this._matieres = ((dd !== undefined) && (dd !== null)) ? dd : [];
				if (this._matieres.length > 0) {
					this._matiere = this._matieres[0];
				} else {
					this._matiere = null;
				}
				this._bInUnite = false;
				return true;
			});
		} else if (this.loginInfo.all_matieres !== null) {
			for (let x of this.loginInfo.all_matieres) {
				if (x.uniteid == uniteid) {
					xmatieres.push(x);
				}
			}//x
			this._matieres = xmatieres;
			if (this._matieres.length > 0) {
				this._matiere = this._matieres[0];
			} else {
				this._matiere = null;
			}
			this._bInUnite = false;
			return Promise.resolve(true);
		}
    }// post_change_unite
}// class UserInfo
