//homemodel.ts
import {IPerson,IDocPersist} from 'infodata';
import {BaseView} from './baseview';
import {UserInfo} from './userinfo';
import {ADMIN_ROUTE, CONSULT_ROUTE} from './infoconstants';
//
const INDEXED_FIELDS:string[] = ["_id","type","status","dossier","sexe","birthDate","birthYear",
"username","firstname","lastname","ville","etablissement",
"serieBac","optionBac","mentionBac","etudesSuperieures","apb",
"sigle","departementid","uniteid","anneeid","groupeid","matiereid","semestreid",
"etudiantid","enseignantid","profaffectationid","groupeeventid","etudiantaffectationid",
"genre","name","startDate","endDate","eventDate","note"];
//

export class HomeModel extends BaseView {
	private _username: string;
	private _password: string;
	private _splashImage: string;
	//
	private _bInitialized: boolean;
	//
	constructor(info: UserInfo) {
		super(info);
		this.title= 'Connexion';
		this._bInitialized = false;
	}
	//
	public get username():string {
		return (this._username !== undefined) ? this._username : null;
	}
	public set username(s:string){
		this._username = this.check_string(s);
	}
	public get password():string {
		return (this._password !== undefined) ? this._password : null;
	}
	public set password(s:string){
		this._password = s;
	}
	public get splash_image():string {
		return (this._splashImage !== undefined) ? this._splashImage : null;
	}
	public set splash_image(s:string){
		this._splashImage = this.check_string(s);
	}
	//
	public get can_connect(): boolean {
		return (this.userInfo !== null) && (this.username !== null) && (this.password !== null) &&
			(this.username.trim().length > 0) && (this.password.trim().length > 0);
	}
	public get cannot_connect(): boolean {
		return (!this.can_connect);
	}
	public get login_image(): string {
		return this.images_dir + "login.jpg";
	}
	public get has_splash_image(): boolean {
		return (this.splash_image !== null);
	}
	public get has_login_image():boolean {
		return (this.login_image !== null);
	}
	private home_image(): string {
		if (this.is_super) {
			return this.images_dir + "admin.jpg";
		} else if (this.is_admin) {
			return this.images_dir + "oper.jpg";
		} else if (this.is_prof) {
			return this.images_dir + "home.jpg";
		} else if (this.is_etud) {
			return this.images_dir + "etudiant.jpg";
		} else {
			return this.login_image;
		}
	}
	public perform_login(): Promise<any> {
		if (!this.can_connect) {
			return Promise.resolve(false);
		}
		this.clear_error();
		return this.userInfo.login(this.username, this.password).then((bRet) => {
			this._username = null;
			this._password = null;
			let pPers = this.person;
			if ((pPers !== null) && (pPers.id !== null)) {
				this.splash_image = this.home_image();
				if ((this.is_super || this.is_admin)) {
					return this.navigate_to(ADMIN_ROUTE);
				} else {
					return this.navigate_to(CONSULT_ROUTE);
				}
			} else {
				this.error_message = 'Identifiant et(ou) mot de passe non-reconnu(s)...';
				return false;
			}
		}).catch((err) => {
			this._username = null;
			this._password = null;
			this.set_error(err);
			return false;
		});
	}// login
	private init_database():Promise<boolean> {
		if (this._bInitialized){
			return Promise.resolve(true);
		}
		let bRet:boolean = false;
		let service = this.dataService;
		let fact = this.itemFactory;
		let pPersist = (service !== null) ? service.service : null;
		if ((pPersist === null) || (fact === null)){
			return Promise.resolve(bRet);
		}
		let pPers:IPerson = null;
		return pPersist.create_indexes(INDEXED_FIELDS).then((bb)=>{
			pPers = fact.create_super_administrator();
			pPers.check_id();
			return service.find_item_by_id(pPers.id);
		}).then((xPers:IPerson)=>{
			if ((xPers === undefined)|| (xPers === null)){
				pPers.reset_password();
				return service.save_item(pPers);
			} else {
				return Promise.resolve(true);
			}
		}).then((xRet)=>{
			bRet = ((xRet !== undefined) && (xRet !== null));
			this._bInitialized = bRet;
			return bRet;
		}).catch((err)=>{
			this.set_error(err);
			return false;
		})
	}// init_database
	public deactivate(): any {
		this._username = null;
		this._password = null;
	}
	public activate(params?: any, config?: any, instruction?: any): any {
		this.splash_image = this.home_image();
		this._username = null;
		this._password = null;
		if (!this._bInitialized) {
			return this.init_database().then((b) => {
				this._bInitialized = true;
				return true;
			}).catch((err)=>{
				this._bInitialized = false;
				return false;
			})
		} else {
			return Promise.resolve(true);
		}
	}// activate
}// class Home
