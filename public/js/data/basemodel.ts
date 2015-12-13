//basemodel.ts
import {InfoElement} from './infoelement';
import {LoginInfo} from './logininfo';
import {UserInfo} from './userinfo';
import {IDataService, IUIManager, IItemFactory, ISemestre, IBaseItem,
IDepartement, IGroupe, IUnite, IAnnee, IMatiere, IPerson, IInfoRouter} from 'infodata';
import {GENRE_TP} from './infoconstants';
//
declare var window;
//
export class BaseModel extends InfoElement {

	private _userinfo: UserInfo;
	private _bInDep: boolean;
	private _bInAnnee: boolean;
	private _bInUnite: boolean;
	private _bInMatiere: boolean;
	private _bInGroupe: boolean;
	private _bInSemestre: boolean;
	private _baseUrl: string;
	private _title: string;
    private _errorMessage: string;
    private _infoMessage: string;
	//
	constructor(user: UserInfo) {
		super();
		this._userinfo = user;
	}// constructor
	//
	public get userInfo(): UserInfo {
		return (this._userinfo !== undefined) ? this._userinfo : null;
	}
	//
	public get_departement_groupetps(): Promise<IGroupe[]> {
		return (this.userInfo !== null) ? this.userInfo.get_departement_groupetps() : Promise.resolve([]);
	}//get_departement_groupetps
	//
	public get anneeMinDate(): string {
		return (this.userInfo !== null) ? this.userInfo.anneeMinDate : null;
	}
	public get anneeMaxDate(): string {
		return (this.userInfo !== null) ? this.userInfo.anneeMaxDate : null;
	}
	public get semestreMinDate(): string {
		return (this.userInfo !== null) ? this.userInfo.semestreMinDate : null;
	}
	public get semestreMaxDate(): string {
		return (this.userInfo !== null) ? this.userInfo.semestreMaxDate : null;
	}
	public get title(): string {
		return (this._title !== undefined) ? this._title : null;
	}
	public set title(s: string) {
		this._title = this.check_string(s);
	}
	public get error_message(): string {
		return (this._errorMessage !== undefined) ? this._errorMessage : null;
	}
	public set error_message(s: string) {
		this._errorMessage = this.check_string(s);
	}
	public get has_error_message(): boolean {
		return (this.error_message !== null) && (this.error_message.length > 0);
	}
	public get info_message(): string {
		return (this._infoMessage !== undefined) ? this._infoMessage : null;
	}
	public set info_message(s: string) {
		this._infoMessage = this.check_string(s);
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
		if ((this._baseUrl === undefined) || (this._baseUrl === null)) {
			let origin = window.location.origin;
			let pathname = window.location.pathname;
			this._baseUrl = origin + pathname.toLowerCase().replace("index.html", "");
			if (!this._baseUrl.endsWith("/")) {
				this._baseUrl = this._baseUrl + "/";
			}
		}
		return this._baseUrl;
	}
	public get images_dir(): string {
        return this.baseUrl + "images/";
	}
	//
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
	public get is_in_semestre_change(): boolean {
		if (this.is_in_annee_change) {
			return true;
		}
		return ((this._bInSemestre !== undefined) && (this._bInSemestre !== null)) ? this._bInSemestre : false;
	}
	public get is_in_matiere_change(): boolean {
		if (this.is_in_unite_change) {
			return true;
		}
		return ((this._bInMatiere !== undefined) && (this._bInMatiere !== null)) ? this._bInMatiere : false;
	}
	public get is_in_groupe_change(): boolean {
		if (this.is_in_departement_change) {
			return true;
		}
		return ((this._bInGroupe !== undefined) && (this._bInGroupe !== null)) ? this._bInGroupe : false;
	}
	//
	protected post_update_departement(): Promise<boolean> {
		this._bInDep = false;
		return Promise.resolve(true);
	}
	protected post_update_annee(): Promise<boolean> {
		this._bInAnnee = false;
		return Promise.resolve(true);
	}
	protected post_update_unite(): Promise<boolean> {
		this._bInUnite = false;
		return Promise.resolve(true);
	}
	protected post_update_groupe(): Promise<boolean> {
		this._bInGroupe = false;
		return Promise.resolve(true);
	}
	protected post_update_semestre(): Promise<boolean> {
		this._bInSemestre = false;
		return Promise.resolve(true);
	}
	protected post_update_matiere(): Promise<boolean> {
		this._bInMatiere = false;
		return Promise.resolve(true);
	}
	public navigate_to(route: string, args?: any): any {
		if (this.userInfo !== null) {
			this.userInfo.navigate_to(route, args);
		}
	}
	protected createUrl(blob: Blob): string {
        if (this.uiManager !== null) {
            return this.uiManager.createUrl(blob);
        } else {
            return null;
        }
    }
	protected revokeUrl(s: string) {
		if ((s !== undefined) && (s !== null) && (this.uiManager !== null)) {
			this.uiManager.revokeUrl(s);
		}
	}
	protected confirm(s: string): Promise<boolean> {
        if (this.uiManager !== null) {
            return this.uiManager.confirm(s);
        } else {
            return Promise.resolve(false);
        }
    }
	protected info(s: string): Promise<any> {
        if (this.uiManager !== null) {
            return this.uiManager.info(s);
        } else {
            return Promise.resolve(false);
        }
    }
	//
	public get loginInfo(): LoginInfo {
		return (this.userInfo !== null) ? this.userInfo.loginInfo : null;
	}
	public get uiManager(): IUIManager {
		return (this.userInfo !== null) ? this.userInfo.uiManager : null;
	}
	public get dataService(): IDataService {
		return this.loginInfo.dataService;
	}
	public get itemFactory(): IItemFactory {
		return this.loginInfo.itemfactory;
	}
	protected get_groupes(): IGroupe[] {
		return (this.userInfo !== null) ? this.userInfo.groupes : [];
	}
	public get groupes(): IGroupe[] {
		return this.get_groupes();
	}
	public get matieres(): IMatiere[] {
		return (this.userInfo !== null) ? this.userInfo.matieres : [];
	}
	public get unites(): IUnite[] {
		return (this.userInfo !== null) ? this.userInfo.unites : [];
	}
	public get semestres(): ISemestre[] {
		return (this.userInfo !== null) ? this.userInfo.semestres : [];
	}
	public get annees(): IAnnee[] {
		return (this.userInfo !== null) ? this.userInfo.annees : [];
	}
    //
    public get departements(): IDepartement[] {
        return (this.userInfo !== null) ? this.userInfo.departements : [];
    }
	public get departement(): IDepartement {
		return (this.userInfo !== null) ? this.userInfo.departement : null;
    }
    public set departement(s: IDepartement) {
		if (this.userInfo === null) {
			return;
		}
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
		return (this.userInfo !== null) ? this.userInfo.semestre : null;
    }
    public set semestre(s: ISemestre) {
		if (this.userInfo !== null) {
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
    }
    public get groupe(): IGroupe {
		return (this.userInfo !== null) ? this.userInfo.groupe : null;
    }
    public set groupe(s: IGroupe) {
		if (this.userInfo !== null) {
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
    }
    //
    public get matiere(): IMatiere {
		return (this.userInfo !== null) ? this.userInfo.matiere : null;
    }
    public set matiere(s: IMatiere) {
		if (this.userInfo !== null) {
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
	}
    public get annee(): IAnnee {
        return (this.userInfo !== null) ? this.userInfo.annee : null;
    }
    public set annee(s: IAnnee) {
		if (this.userInfo !== null) {
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
    }
    public get unite(): IUnite {
		return (this.userInfo !== null) ? this.userInfo.unite : null;
    }
    public set unite(s: IUnite) {
		if (this.userInfo !== null) {
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
    }
	//
	public get departementid(): string {
		return (this.userInfo !== null) ? this.userInfo.departementid : null;
	}
	public get anneeid(): string {
		return (this.userInfo !== null) ? this.userInfo.anneeid : null;
	}
	public get semestreid(): string {
		return (this.userInfo !== null) ? this.userInfo.semestreid : null;
	}
	public get groupeid(): string {
		return (this.userInfo !== null) ? this.userInfo.groupeid : null;
	}
	public get uniteid(): string {
		return (this.userInfo !== null) ? this.userInfo.uniteid : null;
	}
	public get matiereid(): string {
		return (this.userInfo !== null) ? this.userInfo.matiereid : null;
	}
	//
	public get departementName(): string {
		return (this.userInfo !== null) ? this.userInfo.departementName : null;
	}
	public get anneeName(): string {
		return (this.userInfo !== null) ? this.userInfo.anneeName : null;
	}
	public get semestreName(): string {
		return (this.userInfo !== null) ? this.userInfo.semestreName : null;
	}
	public get groupeName(): string {
		return (this.userInfo !== null) ? this.userInfo.groupeName : null;
	}
	public get uniteName(): string {
		return (this.userInfo !== null) ? this.userInfo.uniteName : null;
	}
	public get matiereName(): string {
		return (this.userInfo !== null) ? this.userInfo.matiereName : null;
	}
    //
    public get person(): IPerson {
        return (this.userInfo !== null) ? this.userInfo.person : null;
    }// get person
	
    public login(username: string, spass: string): Promise<boolean> {
		if (this.userInfo !== null) {
			return this.userInfo.login(username, spass);
		} else {
			return Promise.resolve(false);
		}
    }// login
    public logout(): void {
		if (this.userInfo !== null) {
			this.userInfo.logout();
		}
    }// logout
    public get is_super(): boolean {
		return (this.userInfo !== null) ? this.userInfo.is_super : false;
    }
    public get is_admin(): boolean {
		return (this.userInfo !== null) ? this.userInfo.is_admin : false;
    }
    public get is_prof(): boolean {
        return (this.userInfo !== null) ? this.userInfo.is_prof : false;
    }
    public get is_etud(): boolean {
        return (this.userInfo !== null) ? this.userInfo.is_etud : false;
    }
    public get url(): string {
        return (this.userInfo !== null) ? this.userInfo.url : null;
    }
    public get has_url(): boolean {
        return (this.userInfo !== null) ? this.userInfo.has_url : false;
    }
    public get personid(): string {
        return (this.userInfo !== null) ? this.userInfo.personid : null;
    }
    public get fullname(): string {
        return (this.userInfo !== null) ? this.userInfo.fullname : null;
    }
    public get is_connected(): boolean {
        return (this.userInfo !== null) ? this.userInfo.is_connected : false;
    }
    public get is_notconnected(): boolean {
        return (this.userInfo !== null) ? this.userInfo.is_notconnected : false;
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
	protected perform_activate(): Promise<any> {
		if (this.departement === null) {
			if (this.departements.length > 0) {
				this.departement = this.departements[0];
			}
		}
		if (this.annee === null) {
			if (this.annees.length > 0) {
				this.annee = this.annees[0];
			}
		}
		if (this.semestre === null) {
			if (this.semestres.length > 0) {
				this.semestre = this.semestres[0];
			}
		}
		if (this.groupe === null) {
			if (this.groupes.length > 0) {
				this.groupe = this.groupes[0];
			}
		}
		if (this.unite === null) {
			if (this.unites.length > 0) {
				this.unite = this.unites[0];
			}
		}
		if (this.matiere === null) {
			if (this.matieres.length > 0) {
				this.matiere = this.matieres[0];
			}
		}
		return Promise.resolve(true);
	}
}// class BaseModel