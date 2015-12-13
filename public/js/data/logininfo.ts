// logininfo.ts
//
import {IDocPersist, IDataService, IPerson, IDepartement, IAnnee, IUnite, IGroupe, ISemestre,
IMatiere, IEtudiant, IEnseignant, IAdministrator,IItemFactory} from 'infodata';
import {InfoElement} from './infoelement';
import {PouchDatabase} from './pouchdatabase';
import {ItemFactory} from './itemfactory';
import {DataService} from './dataservice';

//
export class LoginInfo extends InfoElement {
	//
	private _dataservice: IDataService;
	//
	private _person: IPerson;
	private _departements: IDepartement[];
    private _annees: IAnnee[];
    private _semestres: ISemestre[];
    private _unites: IUnite[];
    private _matieres: IMatiere[];
    private _groupes: IGroupe[];
    private _administrators: IAdministrator[];
    private _enseignants: IEnseignant[];
    private _etudiants: IEtudiant[];
	private _departement: IDepartement;
	//
	constructor() {
		super();
	}// constructor
	public get dataService(): IDataService {
		if ((this._dataservice === undefined) || (this._dataservice === null)){
			this._dataservice = new DataService(new PouchDatabase(), new ItemFactory());
		}
		return this._dataservice;
	}
	public get itemfactory():IItemFactory {
		return this.dataService.itemFactory;
	}
	public get person(): IPerson {
		return (this._person !== undefined) ? this._person : null;
	}
	public get is_connected():boolean {
		return (this.person !== null);
	}
	public get all_departements(): IDepartement[] {
		return ((this._departements !== undefined) && (this._departements !== null)) ? this._departements : [];
	}
	public get all_annees(): IAnnee[] {
		return ((this._annees !== undefined) && (this._annees !== null)) ? this._annees : [];
	}
	public get all_semestres(): ISemestre[] {
		return ((this._semestres !== undefined) && (this._semestres !== null)) ? this._semestres : [];
	}
	public get all_unites(): IUnite[] {
		return ((this._unites !== undefined) && (this._unites !== null)) ? this._unites : [];
	}
	public get all_matieres(): IMatiere[] {
		return ((this._matieres !== undefined) && (this._matieres !== null)) ? this._matieres : [];
	}
	public get all_groupes(): IGroupe[] {
		return ((this._groupes !== undefined) && (this._groupes !== null)) ? this._groupes : [];
	}
	public get all_etudiants(): IEtudiant[] {
		return ((this._etudiants !== undefined) && (this._etudiants !== null)) ? this._etudiants : [];
	}
	public get all_enseignants(): IEnseignant[] {
		return ((this._enseignants !== undefined) && (this._enseignants !== null)) ? this._enseignants : [];
	}
	public get all_administrators(): IAdministrator[] {
		return ((this._administrators !== undefined) && (this._administrators !== null)) ? this._administrators : [];
	}
	public get departement(): IDepartement {
		return (this._departement !== undefined) ? this._departement : null;
	}
	public set departement(p: IDepartement) {
		if ((p === undefined) || (p === null)) {
			this._departement = null;
		} else {
			this._departement = null;
			let aa = this.all_departements;
			let id = p.id;
			for (let x of aa) {
				if (x.id == id) {
					this._departement = x;
					break;
				}
			}
		}
	}
	private find_user(username: string, password: string): Promise<IPerson> {
		let model: IPerson = this.dataService.itemFactory.create_person({ username: username });
		model.check_id();
		return this.dataService.find_item_by_id(model.id, true).then((pPers: IPerson) => {
			let oRet: IPerson = null;
			if ((pPers !== undefined) && (pPers !== null)) {
				if (pPers.check_password(password)) {
					oRet = pPers;
				}
			}
			return oRet;
		}).catch((e) => {
			return null;
		});
	}// find_user
	public disconnect(): void {
		this._person = null;
		this._departement = null;
		this._departements = null;
		this._annees = null;
		this._groupes = null;
		this._unites = null;
		this._matieres = null;
		this._semestres = null;
		this._etudiants = null;
		this._enseignants = null;
		this._administrators = null;
	}// disconnect
	public refresh_data(): Promise<boolean> {
		let pPers: IPerson = this._person;
		if ((pPers === undefined) || (pPers === null)) {
			return Promise.resolve(false);
		}
		let service = this.dataService;
		if (service === null) {
			return Promise.resolve(false);
		}
		let old: IDepartement = this.departement;
		this._departement = null;
		this._departements = null;
		this._annees = null;
		this._groupes = null;
		this._unites = null;
		this._matieres = null;
		this._semestres = null;
		this._etudiants = null;
		this._enseignants = null;
		this._administrators = null;
		if (pPers.is_super) {
			let model: IDepartement = this.dataService.itemFactory.create_departement();
			let selector: any = { type: model.type };
			return service.query_items(model.type()).then((dd: IDepartement[]) => {
				this._departements = ((dd !== undefined) && (dd !== null)) ? dd : [];
				let xold = (old !== null) ? old.id : null;
				this._departement = this.sync_array(this._departements, xold);
				return true;
			}).catch((e) => {
				return false;
			});
		} else {
			let dids = pPers.departementids;
			return service.get_items_array(dids).then((dd: IDepartement[]) => {
				this._departements = ((dd !== undefined) && (dd !== null)) ? dd : [];
				let xold = (old !== null) ? old.id : null;
				this._departement = this.sync_array(this._departements, xold);
				return service.get_items_array(pPers.anneeids);
			}).then((aa: IAnnee[]) => {
				this._annees = ((aa !== undefined) && (aa !== null)) ? aa : [];
				return service.get_items_array(pPers.uniteids);
			}).then((uu: IUnite[]) => {
				this._unites = ((uu !== undefined) && (uu !== null)) ? uu : [];
				return service.get_items_array(pPers.groupeids);
			}).then((gg: IGroupe[]) => {
				this._groupes = ((gg !== undefined) && (gg !== null)) ? gg : [];
				return service.get_items_array(pPers.semestreids);
			}).then((ss: ISemestre[]) => {
				this._semestres = ((ss !== undefined) && (ss !== null)) ? ss : [];
				return service.get_items_array(pPers.matiereids);
			}).then((mm: IMatiere[]) => {
				this._matieres = ((mm !== undefined) && (mm !== null)) ? mm : [];
				return service.get_items_array(pPers.etudiantids);
			}).then((ee: IEtudiant[]) => {
				this._etudiants = ((ee !== undefined) && (ee !== null)) ? ee : [];
				return service.get_items_array(pPers.enseignantids);
			}).then((pp: IEnseignant[]) => {
				this._enseignants = ((pp !== undefined) && (pp !== null)) ? pp : [];
				return service.get_items_array(pPers.administratorids);
			}).then((gx: IAdministrator[]) => {
				this._administrators = ((gx !== undefined) && (gx !== null)) ? gx : [];
				return true;
			}).catch((err) => {
				return false;
			});
		}
	}// refresh_data
	public login(username: string, password: string): Promise<boolean> {
		this.disconnect();
		return this.find_user(username, password).then((pPers) => {
			this._person = pPers;
			return this.refresh_data();
		}).then((b) => {
			return (this.person !== null);
		})
	}// login
	public get is_super(): boolean {
		return (this.person != null) && this.person.is_super;
	}
	public get is_admin(): boolean {
		if (this.is_super){
			return true;
		}
		let bRet: boolean = false;
		if (this.departement !== null) {
			let id = this.departement.id;
			let aa = this.all_administrators;
			for (let i = 0; i < aa.length; ++i) {
				let a = aa[i];
				if (a.departementid == id) {
					bRet = true;
					break;
				}
			}// i
		}// dep
		return bRet;
	}
	public get is_prof(): boolean {
		let bRet: boolean = false;
		if (this.departement !== null) {
			let id = this.departement.id;
			let aa = this.all_enseignants;
			for (let i = 0; i < aa.length; ++i) {
				let a = aa[i];
				if (a.departementid == id) {
					bRet = true;
					break;
				}
			}// i
		}// dep
		return bRet;
	}
	public get is_etud(): boolean {
		let bRet: boolean = false;
		if (this.departement !== null) {
			let id = this.departement.id;
			let aa = this.all_etudiants;
			for (let i = 0; i < aa.length; ++i) {
				let a = aa[i];
				if (a.departementid == id) {
					bRet = true;
					break;
				}
			}// i
		}// dep
		return bRet;
	}
}// class LoginInfo
