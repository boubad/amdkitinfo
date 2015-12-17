//basemodel.ts
import {InfoElement} from './infoelement';
import {LoginInfo} from './logininfo';
import {UserInfo} from './userinfo';
import {UIManager} from './uimanager';
import {IDataService, IUIManager, IItemFactory, ISemestre, IBaseItem,
IDepartement, IGroupe, IUnite, IAnnee, IMatiere, IPerson, IInfoRouter} from 'infodata';
import {GENRE_TP} from './infoconstants';
//
declare var window;
//
export class BaseModel extends InfoElement {

	public userInfo: UserInfo = null;
	private _bInDep: boolean = false;
	private _bInAnnee: boolean = false;
	private _bInUnite: boolean = false;
	private _bInMatiere: boolean = false;
	private _bInGroupe: boolean = false;
	private _bInSemestre: boolean = false;
	public title: string = null;
    public error_message: string = null;
    public info_message: string = null;
	private _xbusy:boolean = false;
	//
	constructor(user: UserInfo) {
		super();
		this.userInfo = (user !== undefined) ? user : null;
		if (this.userInfo === null) {
			this.userInfo = new UserInfo(new UIManager());
		}
	}// constructor
	//
	public get_departement_groupetps(): Promise<IGroupe[]> {
		return (this.userInfo !== null) ? this.userInfo.get_departement_groupetps() : Promise.resolve([]);
	}//get_departement_groupetps
	//
	public get anneeMinDate(): string {
		return this.userInfo.anneeMinDate;
	}
	public get anneeMaxDate(): string {
		return this.userInfo.anneeMaxDate;
	}
	public get semestreMinDate(): string {
		return this.userInfo.semestreMinDate;
	}
	public get semestreMaxDate(): string {
		return this.userInfo.semestreMaxDate;
	}
	public get has_error_message(): boolean {
		return (this.error_message !== null) && (this.error_message.length > 0);
	}
	public get has_info_message(): boolean {
		return (this.info_message !== null) && (this.info_message.length > 0);
	}
	protected clear_error(): void {
		this.info_message = null;
		this.error_message = null;
	}
	protected set_error(err: any) {
		this.error_message = this.convert_error(err);
	}
	public get baseUrl(): string {
		return this.userInfo.baseUrl;
	}
	public get images_dir(): string {
        return this.baseUrl + "images/";
	}
	//
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
	public get is_in_semestre_change(): boolean {
		if (this.is_in_annee_change) {
			return true;
		}
		return this._bInSemestre;
	}
	public get is_in_matiere_change(): boolean {
		if (this.is_in_unite_change) {
			return true;
		}
		return this._bInMatiere;
	}
	public get is_in_groupe_change(): boolean {
		if (this.is_in_departement_change) {
			return true;
		}
		return this._bInGroupe;
	}
	protected get_is_in_params_change(): boolean {
		return (this.is_in_groupe_change || this.is_in_matiere_change ||
			this.is_in_semestre_change || this.is_in_unite_change || this.is_in_unite_change ||
			this.is_in_departement_change);
	}
	protected get_isbusy_change(): boolean {
		return  this.get_is_in_params_change();
	}// get_is_busy_change
	public get is_in_params_change(): boolean {
		return this.get_is_in_params_change();
	}
	public get is_busy():boolean {
		return this._xbusy || this.get_isbusy_change();
	}
	public set is_busy(b:boolean){
		this._xbusy = ((b !== undefined) && (b !== null)) ? b: false;
	}
	public get is_not_busy():boolean {
		return (!this.is_busy);
	}
	//
	protected post_update_departement(): Promise<boolean> {
		return Promise.resolve(true);
	}
	protected post_update_annee(): Promise<boolean> {
		return Promise.resolve(true);
	}
	protected post_update_unite(): Promise<boolean> {
		return Promise.resolve(true);
	}
	protected post_update_groupe(): Promise<boolean> {
		return Promise.resolve(true);
	}
	protected post_update_semestre(): Promise<boolean> {
		return Promise.resolve(true);
	}
	protected post_update_matiere(): Promise<boolean> {
		return Promise.resolve(true);
	}
	public navigate_to(route: string, args?: any): any {
		this.userInfo.navigate_to(route, args);
	}
	protected createUrl(blob: Blob): string {
		return this.uiManager.createUrl(blob);
    }
	protected revokeUrl(s: string) {
		this.uiManager.revokeUrl(s);
	}
	protected confirm(s: string): Promise<boolean> {
		return this.uiManager.confirm(s);
    }
	protected info(s: string): Promise<any> {
		return this.uiManager.info(s);
    }
	//
	public get loginInfo(): LoginInfo {
		return this.userInfo.loginInfo;
	}
	public get uiManager(): IUIManager {
		return this.userInfo.uiManager;
	}
	public get dataService(): IDataService {
		return this.loginInfo.dataService;
	}
	public get itemFactory(): IItemFactory {
		return this.loginInfo.itemfactory;
	}
	protected get_groupes(): IGroupe[] {
		return this.userInfo.groupes;
	}
	public get groupes(): IGroupe[] {
		return this.get_groupes();
	}
	public get matieres(): IMatiere[] {
		return this.userInfo.matieres;
	}
	public get unites(): IUnite[] {
		return this.userInfo.unites;
	}
	public get semestres(): ISemestre[] {
		return this.userInfo.semestres;
	}
	public get annees(): IAnnee[] {
		return this.userInfo.annees;
	}
    //
    public get departements(): IDepartement[] {
        return this.userInfo.departements;
    }
	public get departement(): IDepartement {
		return this.userInfo.departement;
    }
    public set departement(s: IDepartement) {
		if (this.userInfo.is_in_departement_change) {
			return;
		}
		this._bInDep = true;
        let cur = (s !== undefined) ? s : null;
		this.userInfo.departement = cur;
		this.post_update_departement().then((x) => {
			this._bInDep = false;
		}).catch((e) => {
			this._bInDep = false;
		});
	}
    //
    public get semestre(): ISemestre {
		return this.userInfo.semestre;
    }
    public set semestre(s: ISemestre) {
		if (this.is_in_semestre_change) {
			return;
		}
		this._bInSemestre = true;
		this.userInfo.semestre = s;
		this.post_update_semestre().then((x) => {
			this._bInSemestre = false;
		}).catch((e) => {
			this._bInSemestre = false;
		});
    }
    public get groupe(): IGroupe {
		return this.userInfo.groupe;
    }
    public set groupe(s: IGroupe) {
		if (this.is_in_groupe_change) {
			return;
		}
		this._bInGroupe = true;
		this.userInfo.groupe = s;
		this.post_update_groupe().then((x) => {
			this._bInGroupe = false;
		}).catch((e) => {
			this._bInGroupe = false;
		});
    }
    //
    public get matiere(): IMatiere {
		return this.userInfo.matiere;
    }
    public set matiere(s: IMatiere) {
		if (this.is_in_matiere_change) {
			return;
		}
		this.userInfo.matiere = s;
		this._bInMatiere = true;
		this.post_update_matiere().then((x) => {
			this._bInMatiere = false;
		}).catch((e) => {
			this._bInMatiere = false;
		});
	}
    public get annee(): IAnnee {
        return this.userInfo.annee;
    }
    public set annee(s: IAnnee) {
		if (this.userInfo.is_in_annee_change) {
			return;
		}
		if (this.is_in_annee_change) {
			return;
		}
		this._bInAnnee = true;
		this.userInfo.annee = s;
		this.post_update_annee().then((x) => {
			this._bInAnnee = false;
		}).catch((e) => {
			this._bInAnnee = false;
		});
    }
    public get unite(): IUnite {
		return this.userInfo.unite;
    }
    public set unite(s: IUnite) {
		if (this.userInfo.is_in_unite_change) {
			return;
		}
		if (this.is_in_unite_change) {
			return;
		}
		this._bInUnite = true;
		this.userInfo.unite = s;
		this.post_update_unite().then((xx) => {
			this._bInUnite = false;
		}).catch((e) => {
			this._bInUnite = false;
		});
    }
	//
	public get departementid(): string {
		return this.userInfo.departementid;
	}
	public get anneeid(): string {
		return this.userInfo.anneeid;
	}
	public get semestreid(): string {
		return this.userInfo.semestreid;
	}
	public get groupeid(): string {
		return this.userInfo.groupeid;
	}
	public get uniteid(): string {
		return this.userInfo.uniteid;
	}
	public get matiereid(): string {
		return this.userInfo.matiereid;
	}
	//
	public get departementName(): string {
		return this.userInfo.departementName;
	}
	public get anneeName(): string {
		return this.userInfo.anneeName;
	}
	public get semestreName(): string {
		return this.userInfo.semestreName;
	}
	public get groupeName(): string {
		return this.userInfo.groupeName;
	}
	public get uniteName(): string {
		return this.userInfo.uniteName;
	}
	public get matiereName(): string {
		return this.userInfo.matiereName;
	}
    //
    public get person(): IPerson {
        return this.userInfo.person;
    }// get person
	
    public login(username: string, spass: string): Promise<boolean> {
		return this.userInfo.login(username, spass);
    }// login
    public logout(): void {
		this.error_message = null;
		this.info_message = null;
		this.userInfo.logout();
    }// logout
    public get is_super(): boolean {
		return this.userInfo.is_super;
    }
    public get is_admin(): boolean {
		return this.userInfo.is_admin;
    }
    public get is_prof(): boolean {
        return this.userInfo.is_prof;
    }
    public get is_etud(): boolean {
        return this.userInfo.is_etud;
    }
    public get url(): string {
        return this.userInfo.url;
    }
    public get has_url(): boolean {
        return this.userInfo.has_url;
    }
    public get personid(): string {
        return this.userInfo.personid;
    }
    public get fullname(): string {
        return this.userInfo.fullname;
    }
    public get is_connected(): boolean {
        return this.userInfo.is_connected;
    }
    public get is_notconnected(): boolean {
        return this.userInfo.is_notconnected;
    }
    //
	protected retrieve_one_avatar(item: IBaseItem): Promise<IBaseItem> {
        if ((item === undefined) || (item === null)) {
            return Promise.resolve(item);
        }
		if ((item.url !== undefined) && (item.url !== null)) {
			return Promise.resolve(item);
		}
		item.url = null;
		let id = item.avatarid;
		let docid = item.avatardocid();
		if ((id === undefined) || (id === null) || (docid === undefined) || (docid === null)) {
			return Promise.resolve(item);
		}
		let service = this.dataService;
		let man = this.uiManager;
		if ((service === undefined) || (service === null) || (man === undefined) || (man === null)) {
			return Promise.resolve(item);
		}
        return service.find_attachment(docid, id).then((b) => {
			if ((b !== undefined) && (b !== null)) {
				item.url = man.createUrl(b);
			}
			return item;
		}).catch((e) => {
			return item;
		});
    }// rerieve_one_avatar
    protected retrieve_avatars(items: IBaseItem[]): Promise<IBaseItem[]> {
        if ((items === undefined) || (items === null)) {
            return Promise.resolve([]);
        }
        if (items.length < 1) {
            return Promise.resolve([]);
        }
        let pp: Promise<IBaseItem>[] = [];
        for (let p of items) {
            let x = this.retrieve_one_avatar(p);
            pp.push(x);
        }// p
        return Promise.all(pp);
    }// retrive_avatars
	protected initialize_activate_params(params?:any) : Promise<boolean> {
		return Promise.resolve(true);
	}// initialize_activate_params
	public refreshAll(): Promise<any> {
		return Promise.resolve(false);
	}
	protected perform_activate(): Promise<boolean> {
		let d = this.departement;
		if ((d === null) && (this.departements.length > 0)){
			d = this.departements[0];
		}
		return this.userInfo.change_departement(d).then((x)=>{
			let a = this.annee;
			if ((a === null) && (this.annees.length > 0)) {
				a = this.annees[0];
			}
			return this.userInfo.change_annee(a);
		}).then((xx)=>{
			let a = this.unite;
			if ((a === null) && (this.unites.length > 0)) {
				a = this.unites[0];
			}
			return this.userInfo.change_unite(a);
		}).then((xxx)=>{
			let a = this.semestre;
			if ((a === null) && (this.semestres.length > 0)) {
				a = this.semestres[0];
			}
			return this.userInfo.change_semestre(a);
		}).then((b)=>{
			let a = this.matiere;
			if ((a === null) && (this.matieres.length > 0)) {
				this.matiere = this.matieres[0];
			}
			let g = this.groupe;
			if ((g === null) && (this.groupes.length > 0)) {
				this.groupe = this.groupes[0];
			}
			return true;
		});
	}
}// class BaseModel